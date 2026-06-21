import { BookDetail, Container, Loading } from "@/components";
import { getBookBySlug } from "@/data";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

function BookDetailPage() {
  const { slug } = useParams();

  const {
    data: book,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books", slug],
    queryFn: () => getBookBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) return <Loading />;
  if (isError || !book)
    return <div className="alert alert-error">{error?.message}</div>;

  return (
    <Container>
      <div className="mx-auto md:w-[80%]">
        <BookDetail book={book} />
      </div>
    </Container>
  );
}

export default BookDetailPage;
