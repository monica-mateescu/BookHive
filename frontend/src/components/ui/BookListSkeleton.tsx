import BookCardSkeleton from "./BookCardSkeleton";

const BookListSkeleton = () => {
  return (
    <div className="items-strech grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <BookCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default BookListSkeleton;
