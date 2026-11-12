import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/venture-lab/page-shell";
import { FinalCta, PageHero, Section } from "@/components/venture-lab/primitives";

// BORRADOR: la página de casos se revisa con Rodrigo antes de publicarse.
// Solo se muestra si la variable de entorno MOSTRAR_CASOS vale "true"
// (por ejemplo en un preview). En producción responde 404 y no se indexa.
// No publicar nombres de clientes sin autorización escrita de cada uno.

export const metadata: Metadata = {
  title: "Casos",
  description: "Desafíos reales que llevamos a resultados.",
  robots: { index: false, follow: false },
};

type Caso = {
  segment: "Empresa" | "Institución" | "Venture GOXT";
  who: string;
  challenge: string;
  what: string;
  result: string;
  status: string;
};

const casos: Caso[] = [
  {
    segment: "Venture GOXT",
    who: "NETGROW",
    challenge: "Equipos comerciales que gestionaban clientes entre planillas, correos y WhatsApp.",
    what: "Construimos un CRM con cotizaciones, seguimiento automático y agente de IA.",
    result: "Producto en operación con clientes pagando. [Cifra de usuarios o clientes por confirmar]",
    status: "Propio: se puede publicar",
  },
  {
    segment: "Venture GOXT",
    who: "CARGO",
    challenge: "Dadores de carga sin visibilidad de contratos, despachos y transportistas.",
    what: "Desarrollamos un TMS para digitalizar el proceso logístico de punta a punta.",
    result: "Plataforma en operación. [Volumen de despachos o transacciones por confirmar]",
    status: "Propio: se puede publicar",
  },
  {
    segment: "Empresa",
    who: "Grupo industrial chileno",
    challenge: "[Describir el desafío operativo]",
    what: "Implementación de plataforma GOXT y acompañamiento al equipo de operaciones.",
    result: "[Resultado medible por confirmar]",
    status: "Nombre anonimizado: pendiente de autorización",
  },
  {
    segment: "Institución",
    who: "Universidad en Chile",
    challenge: "Formar habilidades de innovación y emprendimiento con proyectos que no mueran tras el pitch.",
    what: "Programa Power Skills con charlas, acompañamiento y Demo Day.",
    result: "[Participantes y proyectos por confirmar]",
    status: "Nombre anonimizado: pendiente de autorización",
  },
  {
    segment: "Institución",
    who: "Centro de innovación en México",
    challenge: "Activar el ecosistema de emprendimiento local con contenidos prácticos.",
    what: "Dos eventos de innovación y emprendimiento en una semana, como antesala de un programa anual 2027.",
    result: "[Asistentes y continuidad por confirmar]",
    status: "Nombre anonimizado: pendiente de autorización",
  },
];

export default function CasosPage() {
  if (process.env.MOSTRAR_CASOS !== "true") notFound();

  return (
    <PageShell>
      <PageHero
        eyebrow="Casos"
        title="Desafíos reales, resultados concretos"
        lead="Algunos de los proyectos que llevamos del desafío al resultado. Los nombres de clientes se publican solo con su autorización."
      />
      <Section className="pt-0 md:pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          {casos.map((c) => (
            <article key={c.who} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cian">{c.segment}</span>
                <span className="rounded-full bg-ambar/15 px-3 py-1 text-xs text-foreground">{c.status}</span>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">{c.who}</h2>
              <dl className="flex flex-col gap-3 text-sm">
                <div>
                  <dt className="font-medium">Desafío</dt>
                  <dd className="text-muted-foreground">{c.challenge}</dd>
                </div>
                <div>
                  <dt className="font-medium">Qué hicimos</dt>
                  <dd className="text-muted-foreground">{c.what}</dd>
                </div>
                <div>
                  <dt className="font-medium">Resultado</dt>
                  <dd className="text-muted-foreground">{c.result}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </Section>
      <FinalCta />
    </PageShell>
  );
}
