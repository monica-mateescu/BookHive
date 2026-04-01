import { vi } from "vitest";

/**
 * Create a controllable mock object for unit testing authentication flows.
 * This allows us to inspect calls and define custom return values.
 */
export const mockAuthClient = {
  signUp: {
    // Mock for email-based sign up
    email: vi.fn(),
  },
  signIn: {
    // Mock for email-based sign in
    email: vi.fn(),
  },
  // Mock hook to simulate different session states (e.g., logged in, loading, or null)
  //useSession: vi.fn(() => ({ data: null, isPending: false })),
};

/**
 * Global interceptor for the auth utility.
 * Redirects all imports from '@/utils' to our mockAuthClient.
 */
vi.mock("@/utils", () => ({
  authClient: mockAuthClient,
}));
