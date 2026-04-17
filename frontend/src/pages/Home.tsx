import { Clubs } from "@/components";
import { Books } from "@/components";

function Home() {
  return (
    <>
      <h1 className="text-center">Home</h1>
      <Clubs />
      <br/>
      <Books />
    </>
  );
}

export default Home;
