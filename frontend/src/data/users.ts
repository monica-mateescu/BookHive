import type { UsersResponse } from "../types/users";

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

if (!API_URL) {
  throw new Error("API URL is required, are you missing a .env file?");
}

export const getUsers = async (
  page = 1,
  limit = 10,
): Promise<UsersResponse> => {
  const res = await fetch(
    `${API_URL}/api/admin/users?page=${page}&limit=${limit}`,
    {
      credentials: "include",
    },
  );

  if (!res.ok) throw new Error("Failed to fetch users");

  const data = await res.json();
  return data;
};
