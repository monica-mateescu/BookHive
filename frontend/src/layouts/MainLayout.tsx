import { Footer, Header } from "@/components";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="flex w-full grow flex-col items-center">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
