import { API_URL } from "@config";
import type { UsersResponse } from "@types";

export const getUsers = async (
  page = 1,
  limit = 10,
): Promise<UsersResponse> => {
  const res = await fetch(`${API_URL}/api/users?page=${page}&limit=${limit}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch users");

  const data = await res.json();
  return data;
};

export const deleteUser = async (id: string) => {
  const res = await fetch(`${API_URL}/api/users/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to delete user");

  return res.json();
};

export const restoreUser = async (id: string) => {
  const res = await fetch(`${API_URL}/api/users/${id}/restore`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to restore user");

  return res.json();
};
