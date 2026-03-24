import { Outlet } from "react-router";

import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";

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
