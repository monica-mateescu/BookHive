import { Message } from '#models';

export const createMessage = async (clubId: string, senderId: string, text: string) => {
  const message = await Message.create({ clubId, senderId, text });

  return await message.populate('senderId', 'firstName');
};

export const getMessagesByClubId = async (clubId: string, cursor?: string, limit = 20) => {
  const query: any = { clubId };
  const parsedLimit = Number(limit);

  if (cursor) {
    query._id = { $lt: cursor };
  }
  const messages = await Message.find(query)
    .populate('senderId', 'firstName')
    .sort({ _id: -1 })
    .limit(parsedLimit + 1);

  const hasMore = messages.length > parsedLimit;
  if (hasMore) messages.pop();

  const lastMessage = messages.at(-1);

  return {
    data: messages.reverse(),
    nextCursor: lastMessage?._id.toString() || null,
    hasMore: hasMore
  };
};
