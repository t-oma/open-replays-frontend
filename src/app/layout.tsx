import { Outlet } from "react-router";

import { Footer, Header } from "~/shared";

export default function Layout() {
  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
}
