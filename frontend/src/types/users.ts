import type { Pagination } from "./pagination";

export type UsersResponse = {
  data: User[];
  pagination: Pagination;
};
