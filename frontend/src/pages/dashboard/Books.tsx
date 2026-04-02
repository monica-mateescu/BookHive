import { BookCard } from "../../components";

const Books = () => {
  return (
    <section className="p-4">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Books</h2>
      </div>

      <BookCard />
      <BookCard />
      <BookCard />
    </section>
  );
};

export default Books;
