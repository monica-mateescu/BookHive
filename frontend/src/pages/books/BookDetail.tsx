import { BookDetail, Container, Loading } from "@/components";
import { getBookById } from "@data";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

function BookDetailPage() {
  const { id } = useParams();

  const {
    data: book,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books", id],
    queryFn: () => getBookById(id!),
    enabled: !!id,
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
