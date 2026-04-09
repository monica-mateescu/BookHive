import type { RequestHandler } from 'express';
import { Club } from '#models';
import type { ClubDTO, ClubInputDTO, ClubsPagination, ClubsQuery } from '#types';
import { assertBookExists, assertBookIsAssigned, isAdmin } from '#utils';

const contextData = [
  { path: 'createdBy', select: 'firstName lastName email' },
  { path: 'members.userId', select: 'firstName lastName email' },
  { path: 'bookId', select: 'title author description image publishedYear' }
];

export const getClubs: RequestHandler<{}, ClubsPagination, {}, ClubsQuery> = async (req, res) => {
  const { page = 1, limit = 10, isActive } = req.query;
  const skip = (page - 1) * limit;
  const filter: Record<string, unknown> = {};

  if (typeof isActive !== 'undefined') filter.isActive = isActive;

  const [total, data] = await Promise.all([
    Club.countDocuments(filter),
    Club.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate(contextData)
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  res.json({
    data: data as ClubDTO[],
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  });
};

export const createClub: RequestHandler<{}, ClubDTO, ClubInputDTO> = async (req, res) => {
  const {
    user,
    body: { bookId }
  } = req;
  const now = new Date();

  // Check if the user already has an active club with a future meeting date
  if (!isAdmin(user?.role)) {
    const exists = await Club.exists({ createdBy: user?.id, isActive: true, meetingDate: { $gt: now } });
    if (exists) {
      throw new Error('You already have an active club with a future meeting date', { cause: { status: 400 } });
    }
  }

  // Validate the book ID and check if the book is already assigned to another active club with a future meeting date
  await assertBookExists(bookId);
  await assertBookIsAssigned(bookId);

  // Create the club with the creator as the first member
  const members = [{ userId: user?.id, role: 'admin', joinedAt: now }];

  const club = await Club.create({ ...req.body, createdBy: user?.id, members });
  const populatedClub = await club.populate(contextData);

  res.status(201).json(populatedClub);
};

export const getClubById: RequestHandler<{ id: string }, ClubDTO> = async (req, res) => {
  const { id } = req.params;
  const club = await Club.findById(id);
  if (!club) {
    throw new Error('Club not found', { cause: { status: 404 } });
  }
  const populatedClub = await club.populate(contextData);
  res.json(populatedClub);
};

/**
 * Update a club by ID. Only admins or the club owner can update the club. The request body can include any of the club fields except createdBy and members.
 */
export const updateClub: RequestHandler<{ id: string }, ClubDTO, ClubInputDTO> = async (req, res) => {
  const {
    user,
    params: { id },
    body: { bookId }
  } = req;

  const filter: Record<string, unknown> = { _id: id };

  if (!isAdmin(user?.role)) filter.createdBy = user?.id;

  const club = await Club.findOne(filter);
  if (!club) {
    throw new Error('Club not found', { cause: { status: 404 } });
  }

  // Validate the book ID and check if the book is already assigned to another active club with a future meeting date (excluding the current club)
  await assertBookExists(bookId);
  await assertBookIsAssigned(bookId, id);

  club.set(req.body);

  await club.save();
  const populatedClub = await club.populate(contextData);

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

  const club = await Club.findOneAndDelete(filter);

  if (!club) {
    throw new Error('Club not found', { cause: { status: 404 } });
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
    throw new Error('This Club is already full', { cause: { status: 400 } });
  }

  club.members.push({
    userId: userId,
    role: 'member',
    joinedAt: new Date()
  });

  await club.save();
  const populatedClub = await club.populate(contextData);
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
  const populatedClub = await club.populate(contextData);
  res.json(populatedClub as ClubDTO);
};
