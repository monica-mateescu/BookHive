import type { Club, ClubsResponse } from "../types/club";
import type { CreateClubFormData } from "../types/clubForm";

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

if (!API_URL) {
  throw new Error("API URL is required, are you missing a .env file?");
}

const defaultHeaders = {
  "Content-Type": "application/json",
};

export const createClub = async (
  clubData: CreateClubFormData,
): Promise<Club> => {
  const res = await fetch(`${API_URL}/api/clubs`, {
    method: "POST",
    credentials: "include",
    headers: defaultHeaders,
    body: JSON.stringify(clubData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create club");
  }

  const data: Club = await res.json();
  return data;
};

export const getClubs = async (
  page = 1,
  limit = 10,
): Promise<ClubsResponse> => {
  const res = await fetch(`${API_URL}/api/clubs?page=${page}&limit=${limit}`);

  if (!res.ok) throw new Error("Failed to fetch clubs");

  const data = await res.json();
  return data;
};

export const getClubById = async (id: string): Promise<Club> => {
  const res = await fetch(`${API_URL}/api/clubs/${id}`);

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error.message || "Failed to fetch club");
  }

  const data: Club = await res.json();
  return data;
};

export const updateClubById = async (
  id: string,
  clubData: Partial<CreateClubFormData>,
): Promise<Club> => {
  const res = await fetch(`${API_URL}/api/clubs/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: defaultHeaders,
    body: JSON.stringify(clubData),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Failed to update club");
  }

  const data: Club = await res.json();
  return data;
};

export const deleteClubById = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/api/clubs/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Failed to delete club");
  }
};
