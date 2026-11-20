import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AlarmBar } from "./AlarmBar";

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-body">
      <AlarmBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}