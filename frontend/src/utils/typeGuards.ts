import type { BookRef, UserRef } from "@/types/club";

export const isUserRef = (value: string | UserRef): value is UserRef =>
  typeof value !== "string";

export const isBookRef = (value: string | BookRef): value is BookRef =>
  typeof value !== "string";
