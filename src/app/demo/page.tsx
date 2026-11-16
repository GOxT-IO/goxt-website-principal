import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/layout/navbar";
import { DemoSection, Footer } from "@/components/sections";
import { defaultOgImages } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Demo semanal",
  description: "Una vez por semana mostramos NETGROW, CARGO y BI en vivo. Inscríbete gratis y te enviamos la fecha y el enlace.",
  openGraph: {
    title: "Demo semanal | GOXT Venture Lab",
    description: "Una vez por semana mostramos NETGROW, CARGO y BI en vivo. Inscríbete gratis y te enviamos la fecha y el enlace.",
    url: "https://goxt.io/demo",
    images: defaultOgImages,
  },
};

export default function DemoPage() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Suspense>
          <DemoSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
