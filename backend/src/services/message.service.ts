import { Message } from '#models';

export const createMessage = async (clubId: string, senderId: string, text: string) => {
  const message = await Message.create({ clubId, senderId, text });
  return message.toJSON();
};

export const getMessagesByClubId = async (clubId: string) => {
  const messages = await Message.find({ clubId }).sort({ createdAt: -1 }).lean();

  return messages;
};
