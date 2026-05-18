export type CreateClubFormData = {
  name: string;
  description: string;
  meetingLink: string;
  meetingDate: string;
  maxMembers?: number;
  isActive: boolean;
  status: "pending" | "approved" | "rejected";
  imageFile?: File | null;
  bookId: string;
};
