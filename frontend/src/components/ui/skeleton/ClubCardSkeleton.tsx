const ClubCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-lg bg-(--bg-main) shadow-md">
      {/* Top Image */}
      <div className="mb-2 h-44 w-full rounded-tl-lg rounded-tr-lg bg-(--gray-secondary)" />
      <div className="p-5">
        {/* Club Name */}
        <div className="mb-3 h-4 w-2/3 rounded bg-(--gray-secondary)" />

        {/* Bottom Section */}
        <div className="flex gap-3">
          {/* Book Image */}
          <div className="h-24 w-16 rounded bg-(--gray-secondary)" />

          {/* Right Content */}
          <div className="flex flex-1 flex-col justify-between">
            <div className="space-y-2">
              <div className="h-3 w-3/4 rounded bg-(--gray-secondary)" />
              <div className="h-3 w-1/2 rounded bg-(--gray-secondary)" />
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <div className="h-8 w-28 rounded-xl bg-(--gray-secondary)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubCardSkeleton;
