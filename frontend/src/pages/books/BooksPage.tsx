import { Books } from "@/components";

const BooksPage = () => {
  return (
    <>
      <section className="mx-auto mb-14 max-w-3xl text-center">
        <h1 className="text-3xl leading-tight font-semibold text-(--text-main)">
          Explore our book collection
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-(--gray-primary)">
          Join discussions, explore books, connect with readers
        </p>
      </section>
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
