"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Building2, GraduationCap, Lightbulb } from "lucide-react";
import { BRAND, segments, type SegmentSlug } from "@/lib/venture-lab";
import { CtaLink, Eyebrow } from "./primitives";
import EcosystemCycle, { cycleNodes } from "./ecosystem-cycle";
import { cn } from "@/lib/utils";

const icons = { instituciones: GraduationCap, empresas: Building2, emprendedores: Lightbulb } as const;

// Qué provoca cada público en el resto del ecosistema.
const effects: Record<SegmentSlug, string> = {
  empresas: "Tus desafíos se vuelven proyectos para emprendedores y talento de las universidades.",
  emprendedores: "Tu venture genera impacto que las instituciones pueden mostrar y clientes para las empresas.",
  instituciones: "Tus estudiantes resuelven retos reales de empresas y nacen nuevos ventures.",
};

export default function HomeHero() {
  const [active, setActive] = useState<SegmentSlug>("empresas");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const order = cycleNodes.map((n) => n.slug);
    const id = window.setInterval(() => {
      setActive((cur) => order[(order.indexOf(cur) + 1) % order.length]);
    }, 3200);
    return () => window.clearInterval(id);
  }, [touched]);

  const pick = (slug: SegmentSlug) => {
    setTouched(true);
    setActive(slug);
  };

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[720px] bg-[radial-gradient(55%_60%_at_15%_0%,rgba(0,181,216,0.18),transparent),radial-gradient(45%_50%_at_95%_15%,rgba(245,165,36,0.14),transparent)]"
      />
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-10 md:pt-16 pb-16 md:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div className="flex flex-col gap-6">
            <Eyebrow>{BRAND.name}</Eyebrow>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-balance">{BRAND.tagline}.</h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty">{BRAND.promise}</p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2">
              <CtaLink href="/diagnostico">Agenda una conversación</CtaLink>
              <CtaLink href="/metodo" variant="secondary">
                Conoce cómo trabajamos
              </CtaLink>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <EcosystemCycle active={active} onActive={pick} className="max-w-[460px]" />
            <p aria-live="polite" className="min-h-12 max-w-sm text-center text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Causa y efecto: </span>
              {effects[active]}
            </p>
          </div>
        </div>

        <div className="mt-12 md:mt-16 flex flex-col gap-4">
          <p className="text-sm font-medium text-muted-foreground">¿Desde dónde partes?</p>
          <div className="grid gap-4 md:grid-cols-3">
            {segments.map((s) => {
              const Icon = icons[s.slug];
              const on = s.slug === active;
              return (
                <a
                  key={s.slug}
                  href={`/${s.slug}`}
                  onMouseEnter={() => pick(s.slug)}
                  onFocus={() => pick(s.slug)}
                  className={cn(
                    "group relative flex flex-col gap-4 rounded-2xl border bg-card p-6 transition duration-500",
                    on ? "border-cian shadow-xl shadow-cian/10 -translate-y-1" : "border-border"
                  )}
                >
                  <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl transition", on ? "bg-cian text-noche" : "bg-cian/10 text-cian")}>
                    <Icon size={22} />
                  </span>
                  <span className="text-xl font-semibold tracking-tight">{s.selector}</span>
                  <span className="text-sm text-muted-foreground">{s.eyebrow}</span>
                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium">
                    Ver cómo te ayudamos
                    <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
