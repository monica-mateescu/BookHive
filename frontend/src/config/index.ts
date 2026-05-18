export const API_URL = import.meta.env.VITE_APP_SERVER_URL;
export const BASE_APP_URL = import.meta.env.VITE_BASE_APP_URL;

if (!API_URL) {
  throw new Error("API URL is required, are you missing a .env file?");
}

if (!BASE_APP_URL) {
  throw new Error("Base App URL is required, are you missing a .env file?");
}
