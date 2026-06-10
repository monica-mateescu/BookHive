import { Chat, ClubDetail, Container, Loading } from "@/components";
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
    <Container>
      <div className="mx-auto md:w-[80%]">
        <ClubDetail club={club} />
        <Chat clubId={club.id} />
      </div>
    </Container>
  );
}

export default ClubDetailPage;
