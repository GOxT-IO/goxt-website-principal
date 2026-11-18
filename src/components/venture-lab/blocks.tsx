import { ArrowRight, ArrowUpRight } from "lucide-react";
import { segments, pillars, methodSteps, products, networkGroups, type Segment } from "@/lib/venture-lab";
import { CtaLink, Eyebrow, PageHero, Section, SectionHeading, FinalCta } from "./primitives";
import MethodCycle from "./method-cycle";

export function SegmentSelector({ title = "¿Desde dónde partes?" }: { title?: string }) {
  return (
    <div className="flex flex-col gap-8">
      <Eyebrow>{title}</Eyebrow>
      <div className="grid border-t border-border md:grid-cols-3">
        {segments.map((s, i) => (
          <a
            key={s.slug}
            href={`/${s.slug}`}
            className={
              "group flex flex-col gap-3 border-b border-border py-8 md:border-b-0 md:py-10 " +
              (i > 0 ? "md:border-l md:pl-8" : "") +
              (i < 2 ? " md:pr-8" : "")
            }
          >
            <span className="text-2xl font-medium tracking-tight">{s.selector}</span>
            <span className="text-muted-foreground">{s.eyebrow}</span>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[15px] font-medium">
              Ver cómo te ayudamos
              <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
            </span>
          </a>
        ))}
      </div>
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
      <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
        {pillars.map((p) => (
          <div key={p.title} className="flex flex-col gap-3">
            <h3 className="text-xl font-medium tracking-tight">{p.title}</h3>
            <p className="text-muted-foreground">{p.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function MethodSteps({ detailed = false }: { detailed?: boolean }) {
  return (
    <ol className="grid border-t border-border">
      {methodSteps.map((step, i) => (
        <li key={step.name} className="grid gap-2 border-b border-border py-8 md:grid-cols-[80px_1fr_1.4fr_1fr] md:gap-8">
          <span className="text-sm text-muted-foreground">0{i + 1}</span>
          <h3 className="text-xl font-medium tracking-tight">{step.name}</h3>
          <p className="text-muted-foreground">{step.text}</p>
          {detailed && <p className="text-sm text-foreground md:text-right">{step.deliverable}</p>}
        </li>
      ))}
    </ol>
  );
}

export function MethodPreview() {
  return (
    <Section>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Cómo trabajamos"
          title="Un ciclo, no una línea"
          lead="Cada etapa transforma algo y se lo entrega a la siguiente. Escalar abre nuevos desafíos y el ciclo vuelve a empezar."
        />
        <CtaLink href="/metodo" variant="secondary">
          Conoce el método
        </CtaLink>
      </div>
      <div className="mt-14">
        <MethodCycle />
      </div>
    </Section>
  );
}

// Los productos tienen su propia web e identidad: aquí solo se presentan y se enlazan.
export function ProductsGrid() {
  return (
    <div className="grid border-t border-border">
      {products.map((p) => (
        <a
          key={p.name}
          href={p.href}
          {...(p.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="group grid items-baseline gap-2 border-b border-border py-8 md:grid-cols-[1fr_1fr_1.6fr_auto] md:gap-8"
        >
          <span className="text-2xl font-medium tracking-tight">{p.name}</span>
          <span className="text-sm text-muted-foreground">{p.category}</span>
          <span className="text-muted-foreground">{p.text}</span>
          <span className="inline-flex items-center gap-1 text-[15px] font-medium">
            Visitar
            <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </a>
      ))}
    </div>
  );
}

export function ProductsPreview() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Ecosistema GOXT"
        title="Productos que funcionan por sí solos"
        lead="Cada producto tiene su propia marca y su propia web. Nacieron en el lab y son la prueba de que sabemos llevar una idea a un producto con clientes."
      />
      <div className="mt-14">
        <ProductsGrid />
      </div>
    </Section>
  );
}

export function OpenLabBanner() {
  return (
    <Section className="bg-muted">
      <div className="grid gap-12 md:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col gap-5">
          <Eyebrow>Lanzamiento 2027</Eyebrow>
          <h2 className="text-3xl md:text-[44px] md:leading-[1.1] font-medium tracking-[-0.02em] text-balance">
            Laboratorio de innovación abierta junto a NODO
          </h2>
          <p className="text-lg text-muted-foreground">
            Empresas que traen retos reales, equipos de universidades que los resuelven y el equipo de GOXT que
            construye los prototipos. El primer laboratorio se realiza junto a NODO Centro de Innovación.
          </p>
          <CtaLink href="/diagnostico?service=Desarrollo" variant="secondary">
            Quiero plantear un desafío
          </CtaLink>
        </div>
        <ol className="grid self-end border-t border-foreground/15">
          {[
            "Tu empresa plantea un desafío",
            "Equipos universitarios lo trabajan con mentores",
            "GOXT prototipa las mejores soluciones",
            "Demo Day frente a la empresa",
          ].map((t, i) => (
            <li key={t} className="flex gap-6 border-b border-foreground/15 py-4">
              <span className="text-sm text-muted-foreground">0{i + 1}</span>
              <span>{t}</span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

export function NetworkGrid() {
  return (
    <div className="grid gap-x-10 border-t border-border sm:grid-cols-2">
      {networkGroups.map((g) => (
        <div key={g.title} className="flex flex-col gap-3 border-b border-border py-10">
          <h3 className="text-xl font-medium tracking-tight">{g.title}</h3>
          <p className="text-muted-foreground">{g.text}</p>
        </div>
      ))}
    </div>
  );
}

function TextList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-5">
      <Eyebrow>{title}</Eyebrow>
      <ul className="flex flex-col gap-3">
        {items.map((it) => (
          <li key={it} className="text-lg leading-snug">
            {it}
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
        <div className="grid gap-12 border-t border-border pt-12 md:grid-cols-3 md:gap-10">
          <TextList title="Lo que necesitas lograr" items={segment.jobs} />
          <TextList title="Lo que hoy lo frena" items={segment.pains} />
          <TextList title="Lo que ganas" items={segment.gains} />
        </div>
      </Section>

      <Section className="pt-0 md:pt-0">
        <SectionHeading eyebrow="Qué hacemos contigo" title="Una oferta pensada para tu realidad" />
        <div className="mt-14 grid border-t border-border">
          {segment.offer.map((o) => (
            <div key={o.name} className="grid gap-2 border-b border-border py-8 md:grid-cols-[1fr_1.6fr] md:gap-8">
              <h3 className="text-xl font-medium tracking-tight">{o.name}</h3>
              <p className="text-muted-foreground">{o.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-muted">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <Eyebrow>Tu primer resultado · {segment.valueMoment.days}</Eyebrow>
            <h2 className="text-3xl md:text-[44px] md:leading-[1.1] font-medium tracking-[-0.02em] text-balance">
              {segment.valueMoment.label}
            </h2>
            <p className="text-muted-foreground">
              Con un responsable de GOXT con nombre y apellido, un canal directo por WhatsApp y revisión a los 30 y 90
              días.
            </p>
          </div>
          <ol className="grid self-end border-t border-foreground/15">
            {segment.valueMoment.steps.map((step, i) => (
              <li key={step} className="flex gap-6 border-b border-foreground/15 py-4">
                <span className="text-sm text-muted-foreground">0{i + 1}</span>
                <span>{step}</span>
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

      <section className="mx-auto max-w-6xl px-5 md:px-8 pb-20">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-8">
          <span className="text-sm text-muted-foreground">¿No eres {segmentNoun(segment.slug)}?</span>
          {others.map((o) => (
            <CtaLink key={o.slug} href={`/${o.slug}`} variant="secondary">
              {o.selector}
            </CtaLink>
          ))}
        </div>
      </section>
    </>
  );
}

function segmentNoun(slug: Segment["slug"]) {
  if (slug === "instituciones") return "una institución";
  if (slug === "empresas") return "una empresa";
  return "emprendedor";
}
