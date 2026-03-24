import type { TurnstileInstance } from "./turnstile.ts";

declare global {
  interface Window {
    turnstile?: TurnstileInstance;
  }
}
