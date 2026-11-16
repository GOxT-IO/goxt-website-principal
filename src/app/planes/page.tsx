import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import { PricingSection, FormacionSection, Footer } from "@/components/sections";
import { defaultOgImages } from "@/lib/metadata";
import PlatformPricing from "@/components/venture-lab/platform-pricing";

export const metadata: Metadata = {
  title: "Planes y Servicios",
  description: "NETGROW, CARGO y BI desde UF 0,75 por usuario al mes, con descuento de entrada el primer año. Además, setup y desarrollo a medida.",
  openGraph: {
    title: "Planes y Servicios | GOXT Venture Lab",
    description: "NETGROW, CARGO y BI desde UF 0,75 por usuario al mes, con descuento de entrada el primer año. Además, setup y desarrollo a medida.",
    url: "https://goxt.io/planes",
    images: defaultOgImages,
  },
};

export default function PlanesPage() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <PlatformPricing />
        <PricingSection />
        <FormacionSection />
      </main>
      <Footer />
    </div>
  );
}
