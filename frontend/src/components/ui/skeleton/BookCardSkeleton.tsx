const BookCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-lg bg-(--bg-main) shadow-md">
      {/* Image */}
      <div className="h-56 w-full rounded-t-lg bg-gray-200" />

      {/* Content */}
      <div className="flex flex-col gap-3 p-5">
        {/* Title */}
        <div className="h-4 w-3/4 rounded bg-gray-200" />

        {/* Button */}
        <div className="h-9 w-full rounded-xl bg-gray-200" />
      </div>
    </div>
  );
};

export default BookCardSkeleton;
