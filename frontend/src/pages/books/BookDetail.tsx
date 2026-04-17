import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import { BookDetail, Loading } from "../../components";
import { getBookById } from "../../data/books";

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
    <div className="p-5">
      <BookDetail book={book} />
    </div>
  );
}

export default BookDetailPage;
