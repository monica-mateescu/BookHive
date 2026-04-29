import { Books } from "@/components";

const BooksPage = () => {
  return (
    <>
      <h1 className="mb-10 text-center text-3xl font-semibold">
        Explore our book collection
        <span className="block text-lg text-(--gray-primary)">
          Discover your next great read from our extensive library of books.
        </span>
      </h1>
      <section aria-labelledby="books-title">
        <h2 id="books-title" className="sr-only">
          Books list
        </h2>
        <Books />
      </section>
    </>
  );
};

export default BooksPage;
