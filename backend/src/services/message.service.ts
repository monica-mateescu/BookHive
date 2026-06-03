import { Message } from '#models';

export const createMessage = async (clubId: string, senderId: string, text: string) => {
  const message = await Message.create({ clubId, senderId, text });

  return await message.populate('senderId', 'firstName');
};

export const getMessagesByClubId = async (clubId: string, cursor?: string, limit = 20) => {
  const query: any = { clubId };
  if (cursor) {
    query._id = { $lt: cursor };
  }
  const messages = await Message.find(query).populate('senderId', 'firstName').sort({ _id: 1 }).limit(limit);

  const lastMessage = messages.at(-1);

  return {
    data: messages,
    nextCursor: lastMessage?._id.toString() || null,
    hasMore: messages.length === limit
  };
};
