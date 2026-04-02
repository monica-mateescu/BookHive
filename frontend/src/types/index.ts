import type { TurnstileInstance } from "./turnstile.ts";

declare global {
  interface Window {
    turnstile?: TurnstileInstance;
  }

  interface User {
    id: string;
    name: string;
    lastName?: string | null;
    image?: string | null | undefined;
    email: string;
    emailVerified: boolean;
    role: string[];
    createdAt: Date;
    updatedAt: Date;
  }
}
