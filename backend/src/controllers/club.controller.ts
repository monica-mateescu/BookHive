import type { RequestHandler } from 'express';
import { Club } from '#models';
import type { ClubDTO, ClubInputDTO, ClubsPagination, ClubsQuery } from '#types';
import { bookService, clubService } from '#services';
import { isAdmin, deleteFromCloudinary } from '#utils';

export const getClubs: RequestHandler<{}, ClubsPagination, {}, ClubsQuery> = async (req, res) => {
  const { q, page = 1, limit = 10, status, upcoming } = req.query;

  const filter: Record<string, unknown> = {};

  if (typeof status !== 'undefined') filter.status = status;

  if (upcoming) {
    filter.meetingDate = { $gte: new Date() };
  }

  const clubs = await clubService.getPaginatedClubs({ filter, search: q, page, limit });

  res.json(clubs);
};

export const getPopularClubs: RequestHandler<{}, ClubDTO[], {}, {}> = async (_req, res) => {
  const sixtyDaysAgo = new Date();
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

  const clubs = await Club.aggregate<ClubDTO>([
    {
      $match: {
        status: 'approved',
        meetingDate: { $gte: sixtyDaysAgo },
        $expr: {
          $gt: [{ $size: '$members' }, 2]
        }
      }
    },
    {
      $addFields: {
        memberCount: { $size: '$members' }
      }
    },
    { $sort: { memberCount: -1, meetingDate: -1 } },
    { $limit: 8 },
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
        path: '$book'
      }
    },
    {
      $project: {
        _id: 0,
        id: '$_id',
        name: 1,
        members: 1,
        bookId: 1,
        meetingDate: 1,
        maxMembers: 1,
        image: '$image',
        'book.id': '$book._id',
        'book.title': '$book.title',
        'book.author': '$book.author',
        'book.image': '$book.image',
        'book.publishedYear': '$book.publishedYear'
      }
    }
  ]);

  res.json(clubs);
};

export const getMyClubs: RequestHandler<{}, ClubsPagination, {}, ClubsQuery> = async (req, res) => {
  const user = req.user;

  const { page = 1, limit = 10 } = req.query;

  const filter: Record<string, unknown> = {
    $or: [{ createdBy: user?.id }, { 'members.userId': user?.id }]
  };

  const clubs = await clubService.getPaginatedClubs({ filter, page, limit });

  res.json(clubs);
};

export const createClub: RequestHandler<{}, ClubDTO, ClubInputDTO> = async (req, res) => {
  const {
    user,
    body: { bookId }
  } = req;

  const now = new Date();

  await bookService.bookExists(bookId.toString());

  // Check if the user already has an active club with a future meeting date
  if (!isAdmin(user?.role)) {
    const existing = await Club.findOne({
      createdBy: user?.id,
      status: { $in: ['pending', 'approved'] },
      meetingDate: { $gte: now }
    });

    if (existing) {
      throw new Error('You already have an active club', {
        cause: { status: 400 }
      });
    }
  }

  await clubService.bookIsAssigned(bookId.toString());

  const clubData: any = {
    ...req.body,
    createdBy: user?.id,
    members: [{ userId: user?.id, role: 'admin', joinedAt: now }]
  };

  const club = await Club.create(clubData);
  const populatedClub = await club.populate(clubService.populatedFields);

  res.status(201).json(populatedClub);
};

export const getClubById: RequestHandler<{ id: string }, ClubDTO> = async (req, res) => {
  const { id } = req.params;
  const club = await Club.findById(id);
  if (!club) {
    throw new Error('Club not found', { cause: { status: 404 } });
  }
  const populatedClub = await club.populate(clubService.populatedFields);
  res.json(populatedClub);
};

/**
 * Update a club by ID. Only admins or the club owner can update the club.
 * The request body can include any of the club fields except createdBy and members.
 */
export const updateClub: RequestHandler<{ id: string }, ClubDTO, ClubInputDTO> = async (req, res) => {
  const {
    user,
    params: { id },
    body: { bookId }
  } = req;

  await bookService.bookExists(bookId.toString());

  const filter: Record<string, unknown> = { _id: id };

  if (!isAdmin(user?.role)) filter.createdBy = user?.id;

  const club = await Club.findOne(filter);
  if (!club) {
    throw new Error('Club not found', { cause: { status: 404 } });
  }

  await clubService.bookIsAssigned(bookId.toString(), id);

  const previousImage = club.image;

  await club.set(req.body).save();

  const populatedClub = await club.populate(clubService.populatedFields);

  const newImage = req.body.image && req.body.image !== previousImage;

  if (populatedClub && newImage && previousImage) {
    await deleteFromCloudinary(previousImage);
  }

  res.json(populatedClub);
};

/**
 * Delete a club by ID. Only admins or the club owner can delete the club.
 */
export const deleteClub: RequestHandler<{ id: string }> = async (req, res) => {
  const {
    user,
    params: { id }
  } = req;

  const filter: Record<string, unknown> = { _id: id };

  if (!isAdmin(user?.role)) filter.createdBy = user?.id;

  const club = await Club.findOne(filter);
  if (!club) {
    throw new Error('Club not found', { cause: { status: 404 } });
  }

  if (club.members && club.members.length > 0) {
    throw new Error('It is not possible to delete a club with members.', { cause: { status: 400 } });
  }

  const previousImage = club.image;

  await club.deleteOne();

  if (previousImage) {
    await deleteFromCloudinary(previousImage);
  }

  res.status(204).send();
};

/**
 * Join a club by ID.
 */
export const joinClub: RequestHandler<{ id: string }, ClubDTO> = async (req, res) => {
  const {
    user,
    params: { id }
  } = req;
  const userId = user?.id;

  const club = await Club.findById(id);
  if (!club) {
    throw new Error('Club not found', { cause: { status: 404 } });
  }

  // Check if the user is already a member of the club
  const isAlreadyMember = club.members.some(m => m.userId.equals(userId));

  if (isAlreadyMember) {
    throw new Error('You are already a member of this club', { cause: { status: 400 } });
  }

  // Check if the club is already full (maxMembers)
  if (club.maxMembers && club.members.length >= club.maxMembers) {
    throw new Error('This club is already full', { cause: { status: 400 } });
  }

  club.members.push({
    userId: userId,
    role: 'member',
    joinedAt: new Date()
  });

  await club.save();
  const populatedClub = await club.populate(clubService.populatedFields);
  res.json(populatedClub as ClubDTO);
};

/**
 * Leave a club by ID.
 */
export const leaveClub: RequestHandler<{ id: string }, ClubDTO> = async (req, res) => {
  const {
    user,
    params: { id }
  } = req;
  const userId = user?.id;

  const club = await Club.findById(id);
  if (!club) {
    throw new Error('Club not found', { cause: { status: 404 } });
  }

  // Prevent the club owner from leaving the club unless they are an admin
  if (club.createdBy.toString() === userId && !isAdmin(user?.role)) {
    throw new Error('Owner cannot leave the club', { cause: { status: 400 } });
  }

  club.members = club.members.filter(m => {
    const memberId = m.userId._id?.toString();
    return memberId !== userId;
  }) as typeof club.members;

  await club.save();
  const populatedClub = await club.populate(clubService.populatedFields);
  res.json(populatedClub as ClubDTO);
};
