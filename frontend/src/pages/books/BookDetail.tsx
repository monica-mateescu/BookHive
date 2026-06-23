import { BookDetail, Container, ErrorState, Loading } from "@/components";
import { Seo } from "@/components/seo";
import { getBookBySlug } from "@/data";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router";

function BookDetailPage() {
  const { slug } = useParams();

  const {
    data: book,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["book", slug],
    queryFn: () => getBookBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) return <Loading />;

  if (!book || !book.isActive) return <Navigate to="/" replace />;

  return (
    <>
      <Seo title={book.title} description={book.summary} />
      <Container>
        {isError ? (
          <ErrorState message="Something went wrong, we couldn’t load the data. Please try again later." />
        ) : (
          <div className="mx-auto md:w-[80%]">
            <BookDetail book={book} />
          </div>
        )}
      </Container>
    </>
  );
}

export default BookDetailPage;
