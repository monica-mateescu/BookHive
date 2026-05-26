const MyClubItemSkeleton = () => {
  return (
    <li className="list-row flex animate-pulse items-center justify-between gap-3">
      {/* Left: club name and status */}
      <div className="space-y-2">
        <div className="h-4 w-32 rounded bg-gray-300/40" />

        <div className="flex gap-2 text-xs">
          <div className="h-3 w-16 rounded bg-gray-300/30" />
          <div className="h-3 w-3 rounded bg-gray-300/30" />
          <div className="h-3 w-16 rounded bg-gray-300/30" />
          <div className="h-3 w-3 rounded bg-gray-300/30" />
          <div className="h-3 w-20 rounded bg-gray-300/30" />
        </div>
      </div>

      {/* Middle: members badge */}
      <div className="h-4 w-20 rounded bg-gray-300/30" />

      {/* Right: button */}
      <div className="h-8 w-24 rounded-md bg-gray-300/40" />
    </li>
  );
};

export default MyClubItemSkeleton;
