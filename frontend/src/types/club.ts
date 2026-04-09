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
  description: string;
  meetingLink: string;
  meetingDate: string;
  maxMembers?: number;
  bookId: string | BookRef;
  createdBy: string | UserRef;
  members: MemberRef[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type ClubsResponse = {
  data: Club[];
  pagination: Pagination;
};
