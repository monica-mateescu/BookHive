export const API_URL = import.meta.env.VITE_APP_SERVER_URL;

if (!API_URL) {
  throw new Error("API URL is required, are you missing a .env file?");
}
