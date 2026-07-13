import { Club } from '#models';
import { isAdmin } from '#utils';

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

export const canViewClub = (
  club: { status: string; createdBy: any },
  user?: { id: string; role: string[] }
): boolean => {
  if (club.status === 'approved') return true;

  if (!user) return false;

  if (isAdmin(user.role) || club.createdBy.toString() === user.id) return true;

  return false;
};

const buildPagination = (total: number, page: number, limit: number) => {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
};

export const getPaginatedClubs = async ({
  filter,
  search,
  sort,
  page,
  limit
}: {
  filter: Record<string, unknown>;
  search?: string;
  sort?: Record<string, 1 | -1>;
  page: number;
  limit: number;
}) => {
  const skip = (page - 1) * limit;

  const query: Record<string, any> = { ...filter };

  if (search) {
    query.$text = { $search: search };
  }

  let cursor = Club.find(query, search ? { score: { $meta: 'textScore' } } : undefined);

  cursor = cursor.sort(sort || (search ? { score: { $meta: 'textScore' } } : { createdAt: -1 }));

  const [total, data] = await Promise.all([
    Club.countDocuments(query),
    cursor.skip(skip).limit(limit).populate(populatedFields)
  ]);

  return { data, pagination: buildPagination(total, page, limit) };
};

export const getAggregatedPaginatedClubs = async ({
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
    query.$text = { $search: search };
  }

  const pipeline: any[] = [
    { $match: query },
    ...(search ? [{ $addFields: { _textScore: { $meta: 'textScore' } } }] : []),
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
    { $sort: search ? { _eventBucket: 1, _textScore: -1, _sortKey: 1 } : { _eventBucket: 1, _sortKey: 1 } }
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

  const populated = await Club.populate(data, populatedFields);

  return { data: populated, pagination: buildPagination(total, page, limit) };
};

const MIN_MEMBERS_FOR_POPULAR = 2;
const POPULAR_CLUBS_LIMIT = 8;

export const getPopularsClubs = async (start: Date) => {
  const pipeline: any[] = [
    {
      $match: {
        status: 'approved',
        meetingDate: { $gte: start },
        $expr: { $gt: [{ $size: '$members' }, MIN_MEMBERS_FOR_POPULAR] }
      }
    },
    {
      $addFields: {
        memberCount: { $size: '$members' }
      }
    },
    { $sort: { memberCount: -1, meetingDate: -1 } },
    { $limit: POPULAR_CLUBS_LIMIT },
    {
      $lookup: {
        from: 'books',
        localField: 'bookId',
        foreignField: '_id',
        as: 'book'
      }
    },
    {
      $unwind: {
        path: '$book',
        preserveNullAndEmptyArrays: true
      }
    }
  ];

  const clubs = await Club.aggregate([
    ...pipeline,
    {
      $project: {
        _id: 0,
        id: '$_id',
        name: 1,
        slug: 1,
        members: 1,
        bookId: 1,
        meetingDate: 1,
        maxMembers: 1,
        image: 1,
        book: {
          $cond: [
            { $ifNull: ['$book', false] },
            {
              id: '$book._id',
              title: '$book.title',
              slug: '$book.slug',
              author: '$book.author',
              image: '$book.image'
            },
            null
          ]
        }
      }
    }
  ]);

  return clubs;
};
