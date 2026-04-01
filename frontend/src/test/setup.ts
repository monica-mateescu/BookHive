import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

/**
 * Ensure the DOM is cleared after each test to prevent
 * memory leaks and state interference between tests.
 */
afterEach(() => {
  cleanup();
});
