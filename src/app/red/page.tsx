import type { Metadata } from "next";
import PageShell from "@/components/venture-lab/page-shell";
import { NetworkGrid } from "@/components/venture-lab/blocks";
import { CtaLink, FinalCta, PageHero, Section } from "@/components/venture-lab/primitives";

const description =
  "Universidades, centros de innovación, empresas y mentores en Chile, México y Colombia: la red de GOXT Venture Lab.";

export const metadata: Metadata = {
  title: "Red y aliados",
  description,
  openGraph: { title: "Red y aliados | GOXT Venture Lab", description, url: "https://goxt.io/red" },
};

export default function RedPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Red y aliados"
        title="Una red que abre puertas"
        lead="Las universidades traen proyectos y talento, las empresas traen desafíos y presupuesto, y el Demo Day los conecta. Trabajamos en Chile, México y Colombia."
      >
        <CtaLink href="/contacto">Quiero ser aliado</CtaLink>
      </PageHero>
      <Section className="pt-0 md:pt-0">
        <NetworkGrid />
      </Section>
      <FinalCta
        title="Sumemos fuerzas"
        lead="Si eres universidad, centro de innovación, empresa o mentor, conversemos sobre cómo trabajar juntos."
        href="/contacto"
        label="Conversemos"
      />
    </PageShell>
  );
}
