import { Message } from '#models';

export const createMessage = async (clubId: string, senderId: string, text: string) => {
  return await Message.create({ clubId, senderId, text });
};

export const getMessagesByClubId = async (clubId: string) => {
  return await Message.find({ clubId }).populate('senderId', 'firstName').sort({ createdAt: -1 });
};
