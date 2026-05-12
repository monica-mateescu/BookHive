import { Footer, Header } from "@/components";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-5 py-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
