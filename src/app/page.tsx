import type { Metadata } from "next";
import PageShell from "@/components/venture-lab/page-shell";
import HomeHero from "@/components/venture-lab/home-hero";
import { Pillars, MethodPreview, ProductsPreview, OpenLabBanner } from "@/components/venture-lab/blocks";
import { FinalCta } from "@/components/venture-lab/primitives";
import { defaultOgImages } from "@/lib/metadata";

const title = "GOXT Venture Lab | Del desafío al resultado";
const description =
  "Venture lab para instituciones, empresas y emprendedores: diagnosticamos, construimos la tecnología y te conectamos con la red para lograr resultados.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: { title, description, url: "https://goxt.io", images: defaultOgImages },
};

export default function Home() {
  return (
    <PageShell>
      <HomeHero />
      <Pillars />
      <MethodPreview />
      <ProductsPreview />
      <OpenLabBanner />
      <FinalCta />
    </PageShell>
  );
}
