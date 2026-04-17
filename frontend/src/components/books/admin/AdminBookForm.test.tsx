import type { Book } from "@/types";
import { createBook, getBookById, updateBookById } from "@data";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

import CreateBookForm from "./AdminBookForm";

// Mock for API functions
vi.mock("@data", () => ({
  createBook: vi.fn(),
  getBookById: vi.fn(),
  updateBookById: vi.fn(),
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

// Mock for upload file
const mockFile = new File(["fake-binary-image-data"], "book-cover-2.png", {
  type: "image/png",
});

// Mock for book
const mockBookData: Book = {
  id: "123",
  title: "Book title",
  author: "Book author",
  isbn: "123-1234567890",
  summary: "Book summary",
  publishedYear: 2026,
  image: "book-cover-1.png",
};

describe("CreateBookForm", () => {
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
  });

  /* Test 1: Ensure that all required form fields and the submit button are rendered. */
  it("Test 1: Ensure that all required form fields and the submit button are rendered.", () => {
    render(
      <BrowserRouter>
        <CreateBookForm />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Create new book/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Book title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Author/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/ISBN/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Summary/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Published year/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Save book/i }),
    ).toBeInTheDocument();
  });

  /* Test 2: Ensure that the submit button stays disabled while required inputs are empty. */
  it("Test 2: Ensure that the submit button stays disabled while required inputs are empty.", () => {
    render(
      <BrowserRouter>
        <CreateBookForm />
      </BrowserRouter>,
    );
    const submitBtn = screen.getByRole("button", { name: /Save book/i });
    expect(submitBtn).toBeDisabled();
  });

  /* Test 3: Ensure that a new book can be created successfully (create mode). */
  it("Test 3: Ensure that a new book can be created successfully (create mode).", async () => {
    vi.mocked(createBook).mockResolvedValue(mockBookData);

    render(
      <BrowserRouter>
        <CreateBookForm />
      </BrowserRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText(/Book title/i), {
      target: { value: "Book title" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Author/i), {
      target: { value: "Book author" },
    });
    fireEvent.change(screen.getByPlaceholderText(/ISBN/i), {
      target: { value: "123-1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Summary/i), {
      target: { value: "Book summary" },
    });

    const fileInput = screen.getByLabelText(/Upload/i);
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    const submitBtn = screen.getByRole("button", { name: /Save book/i });
    expect(submitBtn).toBeEnabled();
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(createBook).toHaveBeenCalled();
      expect(
        screen.getByText(/Book created successfully/i),
      ).toBeInTheDocument();
    });
  });

  /* Test 4: Ensure that existing data is loaded and updated successfully (edit mode). */
  it("Test 4: Ensure that existing data is loaded and updated successfully (edit mode).", async () => {
    vi.mocked(getBookById).mockResolvedValue(mockBookData);
    vi.mocked(updateBookById).mockResolvedValue({
      ...mockBookData,
      title: "Updated book title",
    });

    render(
      <MemoryRouter initialEntries={["/books/123/edit"]}>
        <Routes>
          <Route path="books/:id/edit" element={<CreateBookForm />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue(mockBookData.title)).toBeInTheDocument();
    });

    expect(screen.getByText(/Edit book/i)).toBeInTheDocument();

    const submitBtn = screen.getByRole("button", { name: /Save changes/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(updateBookById).toHaveBeenCalledWith("123", expect.any(FormData));
      expect(
        screen.getByText(/Book updated successfully/i),
      ).toBeInTheDocument();
      expect(mockedNavigate).toHaveBeenCalledWith("/");
    });
  });

  /* Test 5: Ensure that an error message is displayed when the API call fails. */
  it("Test 5: Ensure that an error message is displayed when the API call fails.", async () => {
    vi.mocked(createBook).mockRejectedValue(new Error("Creating book failed"));

    render(
      <BrowserRouter>
        <CreateBookForm />
      </BrowserRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText(/Book title/i), {
      target: { value: "Book title" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Author/i), {
      target: { value: "Book author" },
    });
    fireEvent.change(screen.getByPlaceholderText(/ISBN/i), {
      target: { value: "123-1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Summary/i), {
      target: { value: "Book summary" },
    });
    fireEvent.change(screen.getByLabelText(/Upload/i), {
      target: { files: [mockFile] },
    });

    fireEvent.click(screen.getByRole("button", { name: /Save book/i }));

    await waitFor(() => {
      expect(screen.getByText(/Creating book failed/i)).toBeInTheDocument();
    });
  });

  /* Test 6: Ensure that the loading state is displayed during the saving process. */
  it("Test 6: Ensure that the loading state is displayed during the saving process.", async () => {
    vi.mocked(createBook).mockReturnValue(
      new Promise((resolve) => setTimeout(() => resolve(mockBookData), 100)),
    );

    render(
      <BrowserRouter>
        <CreateBookForm />
      </BrowserRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText(/Book title/i), {
      target: { value: "Book title" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Author/i), {
      target: { value: "Book author" },
    });
    fireEvent.change(screen.getByPlaceholderText(/ISBN/i), {
      target: { value: "123-1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Summary/i), {
      target: { value: "Book summary" },
    });
    fireEvent.change(screen.getByLabelText(/Upload/i), {
      target: { files: [mockFile] },
    });

    fireEvent.click(screen.getByRole("button", { name: /Save book/i }));

    expect(screen.getByText(/Saving\.\.\./i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  /* Test 7: Ensure that the upload is blocked and an error message is shown when a non-image file is selected. */
  it("Test 7: Ensure that the upload is blocked and an error message is shown when a non-image file is selected.", () => {
    render(
      <BrowserRouter>
        <CreateBookForm />
      </BrowserRouter>,
    );

    const blob = new Blob(["%PDF-1.4"], { type: "application/pdf" });
    const invalidFile = new File([blob], "file.pdf", {
      type: "application/pdf",
    });

    const fileInput = screen.getByLabelText(/Upload/i);

    fireEvent.change(fileInput, { target: { files: [invalidFile] } });

    expect(screen.getByText(/Only images are allowed/i)).toBeInTheDocument();

    const submitBtn = screen.getByRole("button", { name: /Save book/i });
    expect(submitBtn).toBeDisabled();
  });
});
