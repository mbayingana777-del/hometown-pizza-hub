import { Outlet } from "@tanstack/react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartSheet } from "./CartSheet";
import { MobileOrderBar } from "./MobileOrderBar";

export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-24 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <CartSheet />
      <MobileOrderBar />
    </div>
  );
}
