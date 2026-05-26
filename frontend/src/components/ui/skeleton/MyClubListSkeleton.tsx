import MyClubItemSkeleton from "./MyClubItemSkeleton";

const MyClubListSkeleton = () => {
  return (
    <ul className="space-y-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <MyClubItemSkeleton key={index} />
      ))}
    </ul>
  );
};

export default MyClubListSkeleton;
