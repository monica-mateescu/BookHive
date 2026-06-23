import { Chat, ClubDetail, Container, ErrorState, Loading } from "@/components";
import useAuth from "@/contexts/useAuth";
import { getClubBySlug } from "@/data";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

function ClubDetailPage() {
  const { slug } = useParams();
  const { user } = useAuth();

  const {
    data: club,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["clubs", slug],
    queryFn: () => getClubBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) return <Loading />;

  if (isError || !club)
    return (
      <Container>
        <ErrorState message="Something went wrong, we couldn’t load the data. Please try again later." />
      </Container>
    );

  return (
    <Container>
      <div className="mx-auto md:w-[80%]">
        <ClubDetail club={club} />
        {user && <Chat clubId={club.id} />}
      </div>
    </Container>
  );
}

export default ClubDetailPage;
