import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/sections";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
