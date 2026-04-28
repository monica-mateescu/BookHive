import { Clubs } from "@/components";
import { Link } from "react-router";

function Home() {
  return (
    <>
      <section className="mb-10 text-center">
        <h1 className="text-3xl font-semibold">
          Welcome to our vibrant book club community!
          <span className="block text-lg text-(--gray-primary)">
            Join a club to connect with fellow book lovers, share your thoughts,
            and embark on exciting literary adventures together.
          </span>
        </h1>
        <p className="text-md text-(--gray-primary)">
          Not sure where to start? Explore our{" "}
          <Link to="/books" className="text-(--brand-primary) underline">
            collection of books
          </Link>{" "}
          and find the perfect read to spark your next club discussion.
        </p>
      </section>

      <section aria-labelledby="clubs-title">
        <h2 id="clubs-title" className="sr-only">
          Book clubs list
        </h2>

        <Clubs />
      </section>
    </>
  );
}

export default Home;
