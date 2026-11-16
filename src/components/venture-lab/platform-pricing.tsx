import { Check, Plus } from "lucide-react";
import { platformPricing } from "@/lib/venture-lab";
import { CtaLink, Section, SectionHeading } from "./primitives";

export default function PlatformPricing() {
  const pr = platformPricing;
  return (
    <Section>
      <SectionHeading
        eyebrow="Plataformas"
        title="Un mismo precio para NETGROW, CARGO y BI"
        lead="Cada plataforma se contrata por separado y con el mismo esquema. Desde 3 usuarios tienes descuento de entrada durante el primer año."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col gap-4 rounded-3xl bg-noche p-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cian">Precio normal</p>
          <p className="text-5xl font-medium tracking-tight">{pr.base}</p>
          <p className="text-white/70">{pr.unit}, por plataforma. Puedes partir con un solo usuario.</p>
          <ul className="mt-2 flex flex-col gap-2 text-sm text-white/80">
            <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-cian" />Actualizaciones continuas incluidas</li>
            <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-cian" />Soporte técnico base</li>
            <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-cian" />{pr.annual}</li>
          </ul>
          <div className="mt-auto pt-4">
            <CtaLink href="/diagnostico?service=Plataformas" variant="light">Pide tu demo</CtaLink>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cian">Tu primer año, desde 3 usuarios</p>
          <ol className="flex flex-col divide-y divide-border">
            {pr.firstYear.map((t) => (
              <li key={t.period} className="flex items-baseline justify-between gap-4 py-4">
                <div>
                  <p className="font-medium">{t.period}</p>
                  <p className="text-sm text-muted-foreground">{t.note}</p>
                </div>
                <p className="text-2xl font-medium tracking-tight whitespace-nowrap">
                  {t.price}
                  <span className="text-sm font-normal text-muted-foreground"> / usuario</span>
                </p>
              </li>
            ))}
          </ol>
          <p className="text-sm text-muted-foreground">{pr.commitment}</p>
          <div className="mt-2 rounded-2xl bg-muted p-4">
            <p className="text-sm font-medium">Servicios adicionales, se cotizan aparte</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {pr.addOns.map((a) => (
                <li key={a} className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs">
                  <Plus size={12} />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
