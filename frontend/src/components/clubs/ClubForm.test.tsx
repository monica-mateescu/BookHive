import { getBooks } from "@data";
import { createClub, getClubById, updateClubById } from "@data";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { BooksResponse, Club } from "@types";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

import CreateClubForm from "./ClubForm";

// Mock for API functions
vi.mock("@data", () => ({
  getBooks: vi.fn(),
  createClub: vi.fn(),
  getClubById: vi.fn(),
  updateClubById: vi.fn(),
  getClubs: vi.fn(),
}));

// Mock for navigation
const mockedNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual<Record<string, unknown>>("react-router");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

/* Mock the module that provides useAuth. */
vi.mock("@contexts/useAuth", () => ({
  default: () => ({
    user: { id: "123" },
    isAdmin: true,
  }),
}));

const mockFile = new File(["fake-binary-image-data"], "club-preview.png", {
  type: "image/png",
});

// Mock for books
const mockBooks: BooksResponse = {
  data: [
    {
      id: "123",
      title: "Book title 1",
      author: "Book author 1",
      isbn: "123-1234567890",
      summary: "Book summary 1",
      publishedYear: 2026,
      image: "book-cover-1.png",
    },
    {
      id: "456",
      title: "Book title 2",
      author: "Book author 2",
      isbn: "456-4567890123",
      summary: "Book summary 2",
      publishedYear: 2026,
      image: "book-cover-2.png",
    },
  ],
  pagination: {
    total: 2,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  },
};

// Mock for club
const mockClubData: Club = {
  id: "123",
  name: "Club name",
  description: "Club description",
  meetingLink: "https://link.com/m/123",
  meetingDate: "2026-01-01T10:00",
  maxMembers: 15,
  bookId: "456",
  createdBy: "1234567890",
  members: [],
  isActive: true,
  status: "pending",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("CreateClubForm", () => {
  beforeEach(() => {
    // Delete all stored information about previous function calls of the mocks,
    // so that each test starts from scratch and tests do not influence each other.
    vi.clearAllMocks();

    // Simulate the browser function URL.createObjectURL, which is missing in the test environment (JSDOM),
    // it returns the string "mock-url" to enable image preview.
    globalThis.URL.createObjectURL = vi.fn(() => "mock-url");

    // Replace the `scrollIntoView` function with an empty mock function, since JSDOM does not calculate
    // a true layout and the test would otherwise crash if the component attempts to scroll.
    window.HTMLElement.prototype.scrollIntoView = vi.fn();

    // Return an empty book list by default,
    // individual tests can override this if needed
    vi.mocked(getBooks).mockResolvedValue(mockBooks);
  });

  /* Test 1: Ensure that all required form fields and the submit button are rendered. */
  it("Test 1: Ensure that all required form fields and the submit button are rendered.", async () => {
    render(
      <BrowserRouter>
        <CreateClubForm />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Create new club/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Club name/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Club description/i),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Meeting link/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Meeting date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Book/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Create club/i }),
    ).toBeInTheDocument();
  });

  /* Test 2: Ensure that the submit button stays disabled while required inputs are empty. */
  it("Test 2: Ensure that the submit button stays disabled while required inputs are empty.", () => {
    render(
      <BrowserRouter>
        <CreateClubForm />
      </BrowserRouter>,
    );
    const submitBtn = screen.getByRole("button", { name: /Create club/i });
    expect(submitBtn).toBeDisabled();
  });

  /* Test 3: Ensure that a new club can be created successfully (create mode). */
  it("Test 3: Ensure that a new club can be created successfully (create mode).", async () => {
    vi.mocked(createClub).mockResolvedValue(mockClubData);

    render(
      <BrowserRouter>
        <CreateClubForm />
      </BrowserRouter>,
    );

    // Books must be loaded before we can select one
    await waitFor(() =>
      expect(screen.queryByText(/Loading books.../i)).not.toBeInTheDocument(),
    );

    fireEvent.change(screen.getByPlaceholderText(/Club name/i), {
      target: { value: "Club name" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Club description/i), {
      target: { value: "Club description" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Meeting link/i), {
      target: { value: "https://link.com/m/123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Meeting date/i), {
      target: { value: "2026-01-01T10:00" },
    });
    fireEvent.change(screen.getByLabelText(/Book/i), {
      target: { value: "456" },
    });

    const fileInput = screen.getByLabelText(/Upload/i);
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    const submitBtn = screen.getByRole("button", { name: /Create club/i });
    expect(submitBtn).toBeEnabled();
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(createClub).toHaveBeenCalled();

      const fd = vi.mocked(createClub).mock.calls[0][0] as FormData;

      expect(fd.get("name")).toBe("Club name");
      expect(fd.get("description")).toBe("Club description");
      expect(fd.get("meetingLink")).toBe("https://link.com/m/123");
      expect(fd.get("meetingDate")).toBe("2026-01-01T10:00");
      expect(fd.get("bookId")).toBe("456");

      const imageFile = fd.get("image") as File;
      expect(imageFile.name).toBe("club-preview.png");

      expect(
        screen.getByText(/Club created successfully/i),
      ).toBeInTheDocument();
    });
  });

  /* Test 4: Ensure that existing data is loaded and updated successfully (edit mode). */
  it("Test 4: Ensure that existing data is loaded and updated successfully (edit mode).", async () => {
    vi.mocked(getClubById).mockResolvedValue(mockClubData);
    vi.mocked(updateClubById).mockResolvedValue({
      ...mockClubData,
      name: "Updated club name",
    });

    render(
      <MemoryRouter initialEntries={["/clubs/123/edit"]}>
        <Routes>
          <Route path="clubs/:id/edit" element={<CreateClubForm />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue(mockClubData.name)).toBeInTheDocument();
    });

    expect(screen.getByText(/Edit club/i)).toBeInTheDocument();

    const submitBtn = screen.getByRole("button", { name: /Save changes/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(updateClubById).toHaveBeenCalledWith("123", expect.any(FormData));
      expect(
        screen.getByText(/Club updated successfully/i),
      ).toBeInTheDocument();
      expect(mockedNavigate).toHaveBeenCalledWith("/");
    });
  });

  /* Test 5: Ensure that an error message is displayed when the API call fails. */
  it("Test 5: Ensure that an error message is displayed when the API call fails.", async () => {
    vi.mocked(getBooks).mockRejectedValue(new Error("Loading books failed"));

    render(
      <BrowserRouter>
        <CreateClubForm />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Loading books failed/i)).toBeInTheDocument();
    });
  });

  /* Test 6: Ensure that the loading state is displayed during the saving process. */
  it("Test 6: Ensure that the loading state is displayed during the saving process.", async () => {
    vi.mocked(createClub).mockReturnValue(
      new Promise((resolve) => setTimeout(() => resolve(mockClubData), 100)),
    );

    render(
      <BrowserRouter>
        <CreateClubForm />
      </BrowserRouter>,
    );

    await waitFor(() =>
      expect(screen.queryByText(/Loading books.../i)).not.toBeInTheDocument(),
    );

    fireEvent.change(screen.getByPlaceholderText(/Club name/i), {
      target: { value: "Club name" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Club description/i), {
      target: { value: "Club description" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Meeting link/i), {
      target: { value: "https://link.com/m/123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Meeting date/i), {
      target: { value: "2026-01-01T10:00" },
    });
    fireEvent.change(screen.getByLabelText(/Book/i), {
      target: { value: "456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Create club/i }));

    expect(screen.getByText(/Saving\.\.\./i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
