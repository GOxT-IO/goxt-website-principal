import Image from "next/image";
import { ArrowRight, ArrowUpRight, Building2, GraduationCap, Lightbulb, Check } from "lucide-react";
import {
  segments,
  pillars,
  methodSteps,
  products,
  networkGroups,
  type Segment,
} from "@/lib/venture-lab";
import { CtaLink, Eyebrow, PageHero, Section, SectionHeading, FinalCta } from "./primitives";
import MethodCycle from "./method-cycle";

const segmentIcons = {
  instituciones: GraduationCap,
  empresas: Building2,
  emprendedores: Lightbulb,
} as const;

export function SegmentSelector() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {segments.map((s) => {
        const Icon = segmentIcons[s.slug];
        return (
          <a
            key={s.slug}
            href={`/${s.slug}`}
            className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-cian hover:shadow-xl hover:shadow-cian/10"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cian/10 text-cian">
              <Icon size={22} />
            </span>
            <span className="text-xl font-semibold tracking-tight">{s.selector}</span>
            <span className="text-sm text-muted-foreground">{s.eyebrow}</span>
            <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-foreground">
              Ver cómo te ayudamos
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </span>
          </a>
        );
      })}
    </div>
  );
}

export function Pillars() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Por qué GOXT Venture Lab"
        title="Un socio que se arremanga"
        lead="Las aceleradoras eligen pocas startups. Las consultoras entregan informes. Nosotros construimos el resultado contigo."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {pillars.map((p, i) => (
          <div key={p.title} className="flex flex-col gap-3 border-t-2 border-cian pt-6">
            <span className="text-sm font-mono text-muted-foreground">0{i + 1}</span>
            <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
            <p className="text-muted-foreground">{p.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function MethodSteps({ detailed = false }: { detailed?: boolean }) {
  return (
    <ol className="grid gap-4 md:grid-cols-5">
      {methodSteps.map((step, i) => (
        <li
          key={step.name}
          className="relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-5"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
            {i + 1}
          </span>
          <h3 className="text-lg font-semibold">{step.name}</h3>
          <p className="text-sm text-muted-foreground">{step.text}</p>
          {detailed && (
            <p className="mt-auto pt-3 border-t border-border text-xs font-medium uppercase tracking-wide text-cian">
              {step.deliverable}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

export function MethodPreview() {
  return (
    <Section className="bg-muted/50">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <SectionHeading
          eyebrow="Cómo trabajamos"
          title="Un ciclo, no una línea"
          lead="La ciencia observa a las personas y su entorno, la ingeniería lo lleva a la práctica, el diseño lo hace usable y el arte cuestiona cómo lo vivimos. Eso abre nuevas preguntas y el ciclo vuelve a empezar."
        />
        <CtaLink href="/metodo" variant="secondary">
          Conoce el método
        </CtaLink>
      </div>
      <div className="mt-12">
        <MethodCycle />
      </div>
    </Section>
  );
}

export function ProductsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {products.map((p) => (
        <a
          key={p.name}
          href={p.href}
          {...(p.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:border-cian"
        >
          {p.image && (
            <div className="relative aspect-[16/8] overflow-hidden bg-muted">
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <div className="flex flex-col gap-3 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cian">{p.category}</p>
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-2xl font-semibold tracking-tight">{p.name}</h3>
              <ArrowUpRight
                size={20}
                className="text-muted-foreground transition group-hover:rotate-45 group-hover:text-foreground"
              />
            </div>
            <p className="text-muted-foreground">{p.text}</p>
            <ul className="flex flex-wrap gap-2 pt-2">
              {p.features.map((f) => (
                <li key={f} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </a>
      ))}
    </div>
  );
}

export function ProductsPreview() {
  return (
    <Section>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <SectionHeading
          eyebrow="Ecosistema GOXT"
          title="Productos que funcionan por sí solos"
          lead="NETGROW, CARGO, BI y Power Skills se contratan de forma independiente y son parte del ecosistema GOXT Venture Lab. También son la prueba de que sabemos llevar una idea a un producto con clientes."
        />
        <CtaLink href="/productos" variant="secondary">
          Ver productos
        </CtaLink>
      </div>
      <div className="mt-12">
        <ProductsGrid />
      </div>
    </Section>
  );
}

export function OpenLabBanner() {
  return (
    <Section>
      <div className="grid gap-8 rounded-3xl border border-border bg-card p-8 md:grid-cols-[1.4fr_1fr] md:p-12">
        <div className="flex flex-col gap-4">
          <Eyebrow>Lanzamiento 2027</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-balance">
            Laboratorio de innovación abierta junto a NODO
          </h2>
          <p className="text-muted-foreground md:text-lg">
            Empresas que traen retos reales, equipos de universidades que los resuelven y el equipo de
            GOXT que construye los prototipos. El primer laboratorio se realiza junto a NODO Centro de
            Innovación.
          </p>
        </div>
        <div className="flex flex-col justify-between gap-6">
          <ul className="flex flex-col gap-3 text-sm">
            {[
              "Tu empresa plantea un desafío",
              "Equipos universitarios lo trabajan con mentores",
              "GOXT prototipa las mejores soluciones",
              "Demo Day frente a la empresa",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <Check size={18} className="mt-0.5 shrink-0 text-cian" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <CtaLink href="/diagnostico?service=Desarrollo">Quiero plantear un desafío</CtaLink>
        </div>
      </div>
    </Section>
  );
}

export function NetworkGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {networkGroups.map((g) => (
        <div key={g.title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
          <h3 className="text-xl font-semibold tracking-tight">{g.title}</h3>
          <p className="text-muted-foreground">{g.text}</p>
        </div>
      ))}
    </div>
  );
}

function ListCard({ title, items, tone }: { title: string; items: string[]; tone: "pain" | "gain" | "job" }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">{title}</h3>
      <ul className="flex flex-col gap-3">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3">
            <span
              className={
                "mt-2 h-1.5 w-1.5 shrink-0 rounded-full " +
                (tone === "pain" ? "bg-ambar" : tone === "gain" ? "bg-cian" : "bg-foreground")
              }
            />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SegmentPage({ segment }: { segment: Segment }) {
  const others = segments.filter((s) => s.slug !== segment.slug);
  return (
    <>
      <PageHero eyebrow={segment.eyebrow} title={segment.title} lead={segment.lead}>
        <CtaLink href={segment.cta.href}>{segment.cta.label}</CtaLink>
        <CtaLink href="/metodo" variant="secondary">
          Cómo trabajamos
        </CtaLink>
      </PageHero>

      <Section className="pt-0 md:pt-0">
        <div className="grid gap-6 md:grid-cols-3">
          <ListCard title="Lo que necesitas lograr" items={segment.jobs} tone="job" />
          <ListCard title="Lo que hoy lo frena" items={segment.pains} tone="pain" />
          <ListCard title="Lo que ganas" items={segment.gains} tone="gain" />
        </div>
      </Section>

      <Section className="bg-muted/50">
        <SectionHeading eyebrow="Qué hacemos contigo" title="Una oferta pensada para tu realidad" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {segment.offer.map((o) => (
            <div key={o.name} className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold">{o.name}</h3>
              <p className="text-muted-foreground">{o.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="flex flex-col gap-4">
            <Eyebrow>Tu primer resultado</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-balance">
              {segment.valueMoment.label}
            </h2>
            <p className="text-muted-foreground">
              Plazo objetivo: <strong className="text-foreground">{segment.valueMoment.days}</strong>. Con un
              responsable de GOXT con nombre y apellido, un canal directo por WhatsApp y revisión a los 30 y
              90 días.
            </p>
          </div>
          <ol className="flex flex-col gap-3">
            {segment.valueMoment.steps.map((step, i) => (
              <li key={step} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cian/15 text-sm font-semibold text-cian">
                  {i + 1}
                </span>
                <span className="font-medium">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <FinalCta
        title="Del desafío al resultado"
        lead="Hablemos de lo que quieres lograr. En 30 minutos entendemos dónde estás y te proponemos el siguiente paso."
        href={segment.cta.href}
        label={segment.cta.label}
      />

      <Section className="pt-0 md:pt-0">
        <p className="text-sm text-muted-foreground mb-4">¿No eres {segmentNoun(segment.slug)}?</p>
        <div className="flex flex-wrap gap-3">
          {others.map((o) => (
            <a
              key={o.slug}
              href={`/${o.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-muted"
            >
              {o.selector}
              <ArrowRight size={14} />
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}

function segmentNoun(slug: Segment["slug"]) {
  if (slug === "instituciones") return "una institución";
  if (slug === "empresas") return "una empresa";
  return "emprendedor";
}
