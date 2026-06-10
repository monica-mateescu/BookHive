import { Container } from "lucide-react";

import ClubCardSkeleton from "./ClubCardSkeleton";

const ClubListSkeleton = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <ClubCardSkeleton key={i} />
        ))}
      </div>
    </Container>
  );
};

export default ClubListSkeleton;
