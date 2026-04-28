import ClubCardSkeleton from "./ClubCardSkeleton";

const ClubListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <ClubCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default ClubListSkeleton;
