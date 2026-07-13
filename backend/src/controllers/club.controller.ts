import type { RequestHandler } from 'express';
import { Club } from '#models';
import type { ClubDTO, ClubInputDTO, ClubsPagination, ClubsQuery } from '#types';
import { bookService, clubService } from '#services';
import { isAdmin, deleteFromCloudinary } from '#utils';
import { Types } from 'mongoose';

/**
 * Get a paginated list of clubs with optional search and filters.
 * Query parameters:
 * - q: search query to match club names/descriptions (optional)
 * - page: page number for pagination (default: 1)
 * - limit: number of items per page (default: 10)
 * - upcoming: if true, only return clubs with a future meeting date (optional)
 */
export const getClubs: RequestHandler<{}, ClubsPagination, {}, ClubsQuery> = async (req, res) => {
  const { q, page = 1, limit = 10, upcoming } = req.query;

  const filter: Record<string, unknown> = { status: 'approved' };

  if (upcoming) {
    filter.meetingDate = { $gte: new Date() };

    const clubs = await clubService.getPaginatedClubs({ filter, search: q, sort: { meetingDate: 1 }, page, limit });

    return res.json(clubs);
  }

  const clubs = await clubService.getAggregatedPaginatedClubs({ filter, search: q, page, limit });

  res.json(clubs);
};

/**
 * Admin-only endpoint to get all clubs, including pending and rejected ones, with pagination.
 * Query parameters:
 * - q: search query to match club names/descriptions (optional)
 * - page: page number for pagination (default: 1)
 * - limit: number of items per page (default: 10)
 * - status: filter by club status ('pending', 'approved', 'rejected') (optional)
 */
export const getAllClubs: RequestHandler<{}, ClubsPagination, {}, ClubsQuery> = async (req, res) => {
  const { q, page = 1, limit = 10, status } = req.query;

  const filter: Record<string, unknown> = {};

  if (typeof status !== 'undefined') filter.status = status;

  const clubs = await clubService.getPaginatedClubs({ filter, search: q, page, limit });

  res.json(clubs);
};

/**
 * Get a list of popular clubs with more than 2 members and a meeting date within the last 60 days,
 * sorted by member count and meeting date.
 */
const POPULAR_CLUB_WINDOW_DAYS = 60;
export const getPopularClubs: RequestHandler<{}, ClubDTO[], {}, {}> = async (_req, res) => {
  const start = new Date();
  start.setDate(start.getDate() - POPULAR_CLUB_WINDOW_DAYS);

  const clubs = await clubService.getPopularsClubs(start);

  res.json(clubs);
};

/**
 * Get clubs created by or joined by the authenticated user, with pagination.
 * Query parameters:
 * - page: page number for pagination (default: 1)
 * - limit: number of items per page (default: 10)
 */
export const getMyClubs: RequestHandler<{}, ClubsPagination, {}, ClubsQuery> = async (req, res) => {
  const user = req.user;

  const { page = 1, limit = 10 } = req.query;

  const filter: Record<string, unknown> = {
    $or: [{ createdBy: new Types.ObjectId(user?.id) }, { 'members.userId': new Types.ObjectId(user?.id) }]
  };
  const clubs = await clubService.getPaginatedClubs({ filter, page, limit });

  res.json(clubs);
};

/**
 * Create a new club. The authenticated user will be the owner of the club.
 * The request body should include all required club fields except createdBy and members.
 */
export const createClub: RequestHandler<{}, ClubDTO, ClubInputDTO> = async (req, res) => {
  const {
    user,
    body: { bookId }
  } = req;

  const now = new Date();

  await bookService.bookExists(bookId.toString());

  // Check if the user already has an active club with a future meeting date.
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
  const populatedClub = await Club.findById(club._id).populate(clubService.populatedFields);

  res.status(201).json(populatedClub as ClubDTO);
};

/**
 * Get a club by ID.
 */
export const getClubById: RequestHandler<{ id: string }, ClubDTO> = async (req, res) => {
  const { id } = req.params;
  const club = await Club.findById(id).populate(clubService.populatedFields);

  if (!club) {
    throw new Error('Club not found', { cause: { status: 404 } });
  }

  if (!clubService.canViewClub(club, req.user)) {
    throw new Error('Club not found', { cause: { status: 404 } });
  }

  res.json(club as ClubDTO);
};

/**
 * Get a club by slug.
 */
export const getClubBySlug: RequestHandler<{ slug: string }, ClubDTO> = async (req, res) => {
  const { slug } = req.params;

  const club = await Club.findOne({ slug }).populate(clubService.populatedFields);
  if (!club) {
    throw new Error('Club not found', { cause: { status: 404 } });
  }

  if (!clubService.canViewClub(club, req.user)) {
    throw new Error('Club not found', { cause: { status: 404 } });
  }

  res.json(club as ClubDTO);
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

  const populatedClub = await Club.findById(club._id).populate(clubService.populatedFields);

  const newImage = req.body.image && req.body.image !== previousImage;

  if (populatedClub && newImage && previousImage) {
    await deleteFromCloudinary(previousImage);
  }

  res.json(populatedClub as ClubDTO);
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

  if (club.members && club.members.length > 1) {
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

  const club = await Club.findOneAndUpdate(
    {
      _id: id,
      'members.userId': { $ne: userId },
      $expr: { $lt: [{ $size: '$members' }, { $ifNull: ['$maxMembers', Number.MAX_SAFE_INTEGER] }] }
    },
    {
      $push: { members: { userId, role: 'member', joinedAt: new Date() } }
    },
    { new: true }
  );

  if (!club) {
    const existing = await Club.findById(id);

    if (!existing) {
      throw new Error('Club not found', { cause: { status: 404 } });
    }

    const isAlreadyMember = existing.members.some(m => m.userId.toString() === userId);
    if (isAlreadyMember) {
      throw new Error('You are already a member of this club', { cause: { status: 400 } });
    }

    throw new Error('This club is already full', { cause: { status: 400 } });
  }

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

  // Prevent the club owner from leaving the club unless they are an admin.
  if (club.createdBy.toString() === userId && !isAdmin(user?.role)) {
    throw new Error('Owner cannot leave the club', { cause: { status: 400 } });
  }

  club.members = club.members.filter(m => m.userId.toString() !== userId) as typeof club.members;

  await club.save();
  const populatedClub = await club.populate(clubService.populatedFields);
  res.json(populatedClub as ClubDTO);
};
