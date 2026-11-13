import { BRAND } from "@/lib/venture-lab";
import { CtaLink, Eyebrow } from "./primitives";
import { SegmentSelector } from "./blocks";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(55%_60%_at_15%_0%,rgba(0,181,216,0.22),transparent),radial-gradient(45%_50%_at_95%_15%,rgba(245,165,36,0.18),transparent)]"
      />
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-12 md:pt-24 pb-16 md:pb-24">
        <div className="flex flex-col gap-6 max-w-4xl">
          <Eyebrow>{BRAND.name}</Eyebrow>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-balance">
            {BRAND.tagline}.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl text-pretty">
            {BRAND.promise}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2">
            <CtaLink href="/diagnostico">Agenda una conversación</CtaLink>
            <CtaLink href="/metodo" variant="secondary">
              Conoce cómo trabajamos
            </CtaLink>
          </div>
        </div>
        <div className="mt-12 md:mt-16 flex flex-col gap-4">
          <p className="text-sm font-medium text-muted-foreground">¿Desde dónde partes?</p>
          <SegmentSelector />
        </div>
      </div>
    </section>
  );
}
