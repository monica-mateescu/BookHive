export type MessagesResponse = {
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
