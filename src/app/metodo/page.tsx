import type { Metadata } from "next";
import PageShell from "@/components/venture-lab/page-shell";
import { MethodSteps } from "@/components/venture-lab/blocks";
import MethodCycle from "@/components/venture-lab/method-cycle";
import { FinalCta, PageHero, Section, SectionHeading } from "@/components/venture-lab/primitives";

const description =
  "Descubrir, Validar e iterar, Construir, Lanzar y Escalar: el método de GOXT Venture Lab para llevar un desafío a un resultado.";

export const metadata: Metadata = {
  title: "Cómo trabajamos",
  description,
  openGraph: { title: "Cómo trabajamos | GOXT Venture Lab", description, url: "https://goxt.io/metodo" },
};

const principles = [
  {
    title: "Validar antes de programar",
    text: "Cada idea se prueba con usuarios reales antes de invertir en desarrollo. Así se gasta menos y se acierta más.",
  },
  {
    title: "Configurar antes de desarrollar",
    text: "Partimos de plataformas probadas y solo desarrollamos lo que de verdad hace falta. Llegas antes al resultado.",
  },
  {
    title: "Cada etapa termina en algo concreto",
    text: "Un mapa de oportunidades, un prototipo, un producto, clientes. Nunca un informe que queda en un cajón.",
  },
  {
    title: "Medir desde el primer día",
    text: "Definimos los KPIs al inicio y los revisamos a los 30 y 90 días con un responsable de GOXT con nombre y apellido.",
  },
];

export default function MetodoPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Cómo trabajamos"
        title="Del desafío al resultado, en cinco etapas"
        lead="Unimos design thinking, lean startup y desarrollo ágil en un mismo equipo. Puedes entrar en la etapa en la que estés."
      />
      <Section className="pt-0 md:pt-0">
        <MethodCycle />
        <div className="mt-20">
          <MethodSteps detailed />
        </div>
      </Section>
      <Section>
        <SectionHeading eyebrow="Nuestros principios" title="Lo que no negociamos" />
        <div className="mt-14 grid gap-x-10 border-t border-border sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="flex flex-col gap-3 border-b border-border py-10">
              <h3 className="text-xl font-medium tracking-tight">{p.title}</h3>
              <p className="text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>
      <FinalCta />
    </PageShell>
  );
}
