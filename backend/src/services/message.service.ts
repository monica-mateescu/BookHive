import { Message } from '#models';

export const createMessage = async (clubId: string, senderId: string, text: string) => {
  const message = await Message.create({ clubId, senderId, text });

  return message.populate('senderId', 'firstName');
};

export const getMessagesByClubId = async (clubId: string) => {
  return Message.find({ clubId }).populate('senderId', 'firstName').sort({ createdAt: 1 });
};
