import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function CtaLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "relative inline-flex items-center text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden",
        variant === "primary" && "bg-primary text-primary-foreground",
        variant === "secondary" && "border border-border bg-background text-foreground hover:bg-muted",
        variant === "light" && "bg-white text-noche",
        className
      )}
    >
      <span className="relative z-10 transition-all duration-500">{children}</span>
      <span
        className={cn(
          "absolute right-1 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45",
          variant === "primary" && "bg-background text-foreground",
          variant === "secondary" && "bg-primary text-primary-foreground",
          variant === "light" && "bg-ambar text-noche"
        )}
      >
        <ArrowUpRight size={16} />
      </span>
    </a>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cian",
        className
      )}
    >
      <span className="h-px w-6 bg-cian" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 max-w-3xl",
        align === "center" && "mx-auto items-center text-center"
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-balance">{title}</h2>
      {lead && <p className="text-base md:text-lg text-muted-foreground text-pretty">{lead}</p>}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">{children}</div>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-12 md:pt-20 pb-12 md:pb-16">
        <div className="flex flex-col gap-6 max-w-4xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-balance">{title}</h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl text-pretty">{lead}</p>
          {children && <div className="flex flex-wrap gap-4 pt-2">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function FinalCta({
  title = "Cuéntanos tu desafío",
  lead = "En 30 minutos entendemos dónde estás y te proponemos el siguiente paso. Sin compromiso.",
  href = "/diagnostico",
  label = "Agenda una conversación",
}: {
  title?: string;
  lead?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-noche text-white px-6 py-14 md:px-16 md:py-20">
          <div className="relative flex flex-col gap-6 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-balance">{title}</h2>
            <p className="text-white/75 text-base md:text-lg">{lead}</p>
            <CtaLink href={href} variant="light">
              {label}
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
