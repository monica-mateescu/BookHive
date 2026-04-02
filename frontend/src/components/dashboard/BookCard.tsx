const BookCard = () => {
  return (
    <div className="mb-4 rounded-lg border p-4 shadow-md">
      <h2 className="mb-2 text-xl font-bold">Book Title</h2>
      <p className="mb-4 text-gray-600">Author: John Doe</p>
      <p className="mb-4 text-gray-800">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        Edit
      </button>
      <button className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
        Delete
      </button>
    </div>
  );
};

export default BookCard;
