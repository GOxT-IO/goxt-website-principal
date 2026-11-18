import { Suspense } from "react";
import Navbar from "@/components/layout/navbar";
import { DiagnosticoSection, Footer } from "@/components/sections";

export const metadata = {
  title: "Conversemos",
  description: "Cuéntanos tu desafío o tu idea. En 30 minutos entendemos dónde estás y te proponemos el siguiente paso.",
};

export default function DiagnosticoPage() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Suspense>
          <DiagnosticoSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
