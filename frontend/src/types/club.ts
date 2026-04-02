export type Club = {
  id: string;
  name: string;
  description: string;
  meetingLink: string;
  meetingDate: string;
  maxMembers?: number;
  bookId:
    | string
    | {
        id: string;
        title?: string;
        author?: string;
        image?: string;
      };
  createdBy: string;
  members: {
    userId: string;
    role: "member" | "admin";
    joinedAt: string;
  }[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
