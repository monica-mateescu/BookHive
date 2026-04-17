import { ClubDetail, Loading } from "@/components";
import { getClubById } from "@/data";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

function ClubDetailPage() {
  const { id } = useParams();

  const {
    data: club,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["clubs", id],
    queryFn: () => getClubById(id!),
    enabled: !!id,
  });

  if (isLoading) return <Loading />;
  if (isError || !club)
    return <div className="alert alert-error">{error?.message}</div>;

  return (
    <div className="p-5">
      <ClubDetail club={club} />
      <div className="mt-5 text-center">The chat is coming soon.</div>
    </div>
  );
}

export default ClubDetailPage;
