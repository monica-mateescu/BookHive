import { Book, Club } from '#models';

export const populatedFields = [
  { path: 'createdBy', select: 'firstName lastName email' },
  { path: 'members.userId', select: 'firstName lastName email' },
  { path: 'bookId', select: 'title slug author description image publishedYear' }
];

export const bookIsAssigned = async (bookId: string, clubId?: string): Promise<void> => {
  const filter: Record<string, unknown> = {
    bookId,
    status: { $in: ['pending', 'approved'] },
    meetingDate: { $gte: new Date() }
  };

  if (clubId) {
    filter._id = { $ne: clubId };
  }

  const exists = await Club.exists(filter);

  if (exists) {
    throw new Error('This book is already assigned to an active club.', {
      cause: { status: 400 }
    });
  }
};

export const isMember = async (clubId: string, userId: string): Promise<boolean> => {
  const exists = await Club.exists({ _id: clubId, 'members.userId': userId });

  return !!exists;
};

export const getPaginatedClubs = async ({
  filter,
  search,
  page,
  limit
}: {
  filter: Record<string, unknown>;
  search?: string;
  page: number;
  limit: number;
}) => {
  const skip = (page - 1) * limit;
  const now = new Date();

  const query: Record<string, any> = { ...filter };

  if (search) {
    const regex = new RegExp(search, 'i');
    query.$or = [{ name: regex }, { description: regex }];
  }

  const pipeline: any[] = [
    { $match: query },
    {
      $addFields: {
        meetingEndDate: {
          $add: ['$meetingDate', { $multiply: ['$durationMinutes', 60_000] }]
        }
      }
    },
    {
      $addFields: {
        // 0 = ongoing, 1 = upcoming, 2 = past
        _eventBucket: {
          $switch: {
            branches: [
              {
                case: {
                  $and: [{ $lte: ['$meetingDate', now] }, { $gte: ['$meetingEndDate', now] }]
                },
                then: 0
              },
              { case: { $gt: ['$meetingDate', now] }, then: 1 }
            ],
            default: 2
          }
        },
        // ascending within ongoing/upcoming (soonest first),
        // descending within past (most recently ended first) via negated timestamp
        _sortKey: {
          $cond: [
            { $lt: ['$meetingEndDate', now] },
            { $multiply: [{ $toLong: '$meetingEndDate' }, -1] },
            { $toLong: '$meetingDate' }
          ]
        }
      }
    },
    { $sort: { _eventBucket: 1, _sortKey: 1 } }
  ];

  const [countResult, data] = await Promise.all([
    Club.aggregate([{ $match: query }, { $count: 'total' }]),
    Club.aggregate([
      ...pipeline,
      { $skip: skip },
      { $limit: Number(limit) },
      {
        $project: {
          _id: 0,
          id: '$_id',
          name: 1,
          slug: 1,
          description: 1,
          meetingLink: 1,
          meetingDate: 1,
          durationMinutes: 1,
          maxMembers: 1,
          bookId: 1,
          createdBy: 1,
          members: 1,
          status: 1,
          image: 1,
          createdAt: 1,
          updatedAt: 1
        }
      }
    ])
  ]);

  const total = countResult[0]?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const populated = await Club.populate(data, populatedFields);

  return {
    data: populated,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  };
};
