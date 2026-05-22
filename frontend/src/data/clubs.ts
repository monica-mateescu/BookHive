import { API_URL } from "@config";
import type { Club, ClubsResponse } from "@types";

const defaultHeaders = {
  "Content-Type": "application/json",
};

export const createClub = async (formData: FormData): Promise<Club> => {
  const res = await fetch(`${API_URL}/api/clubs`, {
    method: "POST",
    credentials: "include",
    body: formData,
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
  filters?: { isActive?: string; status?: string },
): Promise<ClubsResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, value);
      }
    });
  }
  const res = await fetch(`${API_URL}/api/clubs?${params.toString()}`);

  if (!res.ok) throw new Error("Failed to fetch clubs");

  const data = await res.json();
  return data;
};

export const getMyClubs = async (
  page = 1,
  limit = 10,
): Promise<ClubsResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const res = await fetch(`${API_URL}/api/clubs/me?${params.toString()}`);

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
  formData: FormData,
): Promise<Club> => {
  const res = await fetch(`${API_URL}/api/clubs/${id}`, {
    method: "PUT",
    credentials: "include",
    body: formData,
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

export const joinClub = async (id: string): Promise<Club> => {
  const res = await fetch(`${API_URL}/api/clubs/${id}/join`, {
    method: "POST",
    credentials: "include",
    headers: defaultHeaders,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Failed to join club");
  }

  return res.json();
};

export const leaveClub = async (id: string): Promise<Club> => {
  const res = await fetch(`${API_URL}/api/clubs/${id}/leave`, {
    method: "POST",
    credentials: "include",
    headers: defaultHeaders,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Failed to leave club");
  }

  return res.json();
};
