import { BRAND } from "@/lib/venture-lab";
import { CtaLink } from "./primitives";
import { SegmentSelector } from "./blocks";

export default function HomeHero() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-5 md:px-8 pt-24 md:pt-40 pb-20 md:pb-28">
        <div className="flex max-w-4xl flex-col gap-8">
          <h1 className="text-[48px] leading-[1.02] md:text-[88px] md:leading-[0.98] font-medium tracking-[-0.04em] text-balance">
            {BRAND.tagline}.
          </h1>
          <p className="max-w-2xl text-lg md:text-[22px] md:leading-snug text-muted-foreground text-pretty">
            {BRAND.promise}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
            <CtaLink href="/diagnostico">Conversemos</CtaLink>
            <CtaLink href="/metodo" variant="secondary">
              Cómo trabajamos
            </CtaLink>
          </div>
        </div>
        <div className="mt-24 md:mt-36">
          <SegmentSelector />
        </div>
      </div>
    </section>
  );
}
