import { Container } from "@/components";
import { getPageTitle } from "@/utils";
import { Link } from "react-router";

function About() {
  const pageTitle = getPageTitle("About");
  return (
    <Container>
      <title>{pageTitle}</title>
      <h1 className="text-3xl font-semibold">About</h1>
      <div className="mt-2 text-(--gray-primary)">
        Finding ground in a fast-paced world
      </div>
      <p className="mt-2">
        In today’s hyper-connected, rapidly changing world, our minds rarely
        find a moment of true stillness. We believe that opening a book is one
        of the most powerful ways to protect our inner peace, strengthen our
        resilience, and reconnect with our emotions. When you turn the pages,
        the chaos of the outside world fades away, and a moment to reconnect
        with yourself opens up.
      </p>
      <p className="mt-2">
        BookHive was born from a simple yet profound mission: to blend the
        offline experience of reading with digital connection power, creating a
        community where stories bring people closer together.
      </p>
      <p className="mt-2">
        How it works today is just the beginning: you{" "}
        <Link to="/books" className="underline hover:text-(--brand-primary)">
          discover books
        </Link>
        ,{" "}
        <Link to="/clubs" className="underline hover:text-(--brand-primary)">
          join a book club
        </Link>{" "}
        or create one by your-own, enjoy your reading offline, and meet online
        via live chat and video meetings to share your thoughts.
      </p>
      <h2 className="mt-5 text-xl font-semibold text-(--text-main)">
        What is BookHive about?
      </h2>
      <p className="mt-2">
        Whether you are reading the book, writing it, or bringing it to the
        community, there is a place for you in our hive:
      </p>
      <ul className="mt-5 list-disc space-y-2 pl-5">
        <li>
          <b className="font-semibold">For readers:</b> Discover your next
          favorite book and connect with like-minded people. BookHive helps you
          turn solitary reading into a shared journey of personal growth and
          friendship.
        </li>
        <li>
          <b className="font-semibold">For authors:</b> Especially if you are
          self-published, or just starting out, BookHive is your platform to
          present your work directly to passionate readers and build an engaged
          audience from the ground up.
        </li>
        <li>
          <b className="font-semibold">For printers & publishers:</b> You can be
          a technical partner for our community and talented authors to turn
          digital manuscripts into printed reality and bring beautiful books to
          live.
        </li>
        <li>
          <b className="font-semibold">For bookstores & libraries:</b> The
          physical space where all pieces of the puzzle come together. By
          organizing your own book clubs and hosting hybrid reading events
          through BookHive, you can attract new visitors and expand your local
          literary hubs.
        </li>
      </ul>
      <h2 className="mt-5 text-xl font-semibold text-(--text-main)">
        Do you have some feedback for us?
      </h2>
      <p className="mt-2">
        We are very excited to hear from you! Send us a message via our{" "}
        <Link to="/contact" className="underline hover:text-(--brand-primary)">
          contact form
        </Link>{" "}
        and let’s create the ultimate digital place for reading and connection
        together.
      </p>
    </Container>
  );
}

export default About;
