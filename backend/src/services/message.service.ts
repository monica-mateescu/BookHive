import { Message } from '#models';
import { Types } from 'mongoose';

export const createMessage = async (clubId: Types.ObjectId, senderId: string, text: string) => {
  const message = await Message.create({ clubId, senderId, text });

  return message.populate('senderId', 'firstName');
};

export const getMessagesByClubId = async (clubId: string, cursor?: string, limit = 20) => {
  const query: Record<string, unknown> = { clubId };

  if (cursor) {
    query._id = { $lt: cursor };
  }

  const messages = await Message.find(query)
    .populate('senderId', 'firstName')
    .sort({ _id: -1 })
    .limit(limit + 1);

  const hasMore = messages.length > limit;
  if (hasMore) messages.pop();

  const lastMessage = messages.at(-1);

  return {
    data: messages.reverse(),
    nextCursor: lastMessage?._id.toString() ?? null,
    hasMore
  };
};
