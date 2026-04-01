import type { RequestHandler } from 'express';
import { Club } from '#models';
import type { ClubDTO, ClubInputDTO, ClubsPagination, ClubsQuery } from '#types';
import { assertBookExists, assertBookIsAssigned } from '#utils';

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
  if (user?.role !== 'admin') {
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

  if (user?.role !== 'admin') filter.createdBy = user?.id;

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

  if (user?.role !== 'admin') filter.createdBy = user?.id;

  const club = await Club.findOneAndDelete(filter);

  if (!club) {
    throw new Error('Club not found', { cause: { status: 404 } });
  }
  res.status(204).send();
};
