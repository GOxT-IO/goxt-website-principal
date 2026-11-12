import type { Metadata } from "next";
import PageShell from "@/components/venture-lab/page-shell";
import { ProductsGrid } from "@/components/venture-lab/blocks";
import { CtaLink, FinalCta, PageHero, Section } from "@/components/venture-lab/primitives";

const description =
  "NETGROW, CARGO, BI y Power Skills: productos independientes que funcionan por sí solos y forman parte del ecosistema GOXT Venture Lab.";

export const metadata: Metadata = {
  title: "Productos",
  description,
  openGraph: { title: "Productos | GOXT Venture Lab", description, url: "https://goxt.io/productos" },
};

export default function ProductosPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Ecosistema GOXT"
        title="Productos que funcionan por sí solos"
        lead="Cada producto se contrata de forma independiente y resuelve un problema concreto. Juntos forman el ecosistema GOXT Venture Lab y son la base sobre la que construimos los proyectos de nuestros clientes."
      >
        <CtaLink href="/planes">Ver planes y precios</CtaLink>
        <CtaLink href="/plataformas" variant="secondary">
          Ingresar a mi plataforma
        </CtaLink>
      </PageHero>
      <Section className="pt-0 md:pt-0">
        <ProductsGrid />
      </Section>
      <FinalCta
        title="¿No sabes qué producto necesitas?"
        lead="Cuéntanos tu desafío y te recomendamos el punto de partida, aunque sea uno solo de nuestros productos."
        href="/diagnostico?service=Plataformas"
        label="Pide una recomendación"
      />
    </PageShell>
  );
}
