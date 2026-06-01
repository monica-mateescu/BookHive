export type Chat = {
  chatId: string;
  isConnected: boolean;
};

export type MessageResponse = {
  id: string;
  text: string;
  clubId: string;
  senderId: {
    id: string;
    firstName: string;
  };
  createdAt: string;
  updatedAt: string;
};
