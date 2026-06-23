import { Chat, ClubDetail, Container, ErrorState, Loading } from "@/components";
import { Seo } from "@/components/seo";
import useAuth from "@/contexts/useAuth";
import { getClubBySlug } from "@/data";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router";

function ClubDetailPage() {
  const { slug } = useParams();
  const { user } = useAuth();

  const {
    data: club,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["club", slug],
    queryFn: () => getClubBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) return <Loading />;

  if (!club || club.status != "approved") return <Navigate to="/" replace />;

  return (
    <>
      <Seo title={club.name} description={club.description} />
      <Container>
        {isError ? (
          <ErrorState message="Something went wrong, we couldn’t load the data. Please try again later." />
        ) : (
          <div className="mx-auto md:w-[80%]">
            <ClubDetail club={club} />
            {user && <Chat clubId={club.id} />}
          </div>
        )}
      </Container>
    </>
  );
}

export default ClubDetailPage;
