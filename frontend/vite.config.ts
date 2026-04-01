import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [react(), tailwindcss()],
  test: {
    // Enable global test functions like 'describe' and 'it' without manual imports
    globals: true,
    // Simulate a browser environment, which is required for testing React components
    environment: "jsdom",
    // Path to the initialization file that loads custom matchers (e.g., toBeInTheDocument)
    setupFiles: "./src/test/setup.ts",
  },
});
