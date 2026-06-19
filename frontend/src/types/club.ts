import type { Pagination } from "./pagination";

export type UserRef = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type MemberRef = {
  userId: string | UserRef;
  role: string;
  joinedAt: string;
};

export type BookRef = {
  id: string;
  title?: string;
  author?: string;
  publishedYear?: number;
  image?: string;
};

export type Club = {
  id: string;
  name: string;
  slug: string;
  description: string;
  meetingLink: string;
  meetingDate: string;
  maxMembers?: number;
  bookId: string | BookRef;
  book?: BookRef;
  createdBy: string | UserRef;
  members: MemberRef[];
  status: "pending" | "approved" | "rejected";
  image?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ClubsResponse = {
  data: Club[];
  pagination: Pagination;
};
