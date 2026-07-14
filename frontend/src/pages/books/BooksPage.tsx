import { Books, Container } from "@/components";
import { Seo } from "@/components/seo";

const BooksPage = () => {
  return (
    <>
      <Seo
        title="Books discussed by our clubs"
        description="Explore books featured by our reading clubs and discover new titles through community recommendations and discussions."
      />
      <Container>
        <section className="mx-auto mb-14 max-w-3xl text-center">
          <h1 className="text-center text-3xl font-semibold">
            Explore our book collection
          </h1>
          <div className="mt-2 text-center text-(--gray-primary)">
            Join discussions, explore books, connect with readers.
          </div>
        </section>
        <section aria-labelledby="books-title">
          <h2 id="books-title" className="sr-only">
            Books list
          </h2>
          <Books />
        </section>
      </Container>
    </>
  );
};

export default BooksPage;
