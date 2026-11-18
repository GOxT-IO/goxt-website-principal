import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Estilo minimalista: mucho blanco, tipografía grande, casi sin color.
// Solo dos tipos de botón: principal (píldora negra) y enlace de texto.

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
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex w-fit items-center gap-1.5 text-[15px] font-medium transition",
        variant === "primary" && "h-11 rounded-full bg-primary px-5 text-primary-foreground hover:opacity-85",
        variant === "light" && "h-11 rounded-full bg-white px-5 text-black hover:opacity-85",
        variant === "secondary" && "h-11 text-foreground hover:opacity-70",
        className
      )}
    >
      {children}
      {variant === "secondary" && <Icon size={16} className="transition group-hover:translate-x-0.5" />}
    </a>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
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
    <div className={cn("flex max-w-3xl flex-col gap-4", align === "center" && "mx-auto items-center text-center")}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl md:text-[44px] md:leading-[1.1] font-medium tracking-[-0.02em] text-balance">{title}</h2>
      {lead && <p className="text-lg text-muted-foreground text-pretty">{lead}</p>}
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
    <section id={id} className={cn("py-20 md:py-32", className)}>
      <div className="mx-auto max-w-6xl px-5 md:px-8">{children}</div>
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
    <section>
      <div className="mx-auto max-w-6xl px-5 md:px-8 pt-20 md:pt-32 pb-16 md:pb-24">
        <div className="flex max-w-4xl flex-col gap-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-[40px] leading-[1.08] md:text-[64px] md:leading-[1.05] font-medium tracking-[-0.03em] text-balance">
            {title}
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground text-pretty">{lead}</p>
          {children && <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function FinalCta({
  title = "Cuéntanos tu desafío",
  lead = "En 30 minutos entendemos dónde estás y te proponemos el siguiente paso. Sin compromiso.",
  href = "/diagnostico",
  label = "Conversemos",
}: {
  title?: string;
  lead?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 md:px-8 py-24 md:py-36">
        <h2 className="max-w-3xl text-4xl md:text-[56px] md:leading-[1.05] font-medium tracking-[-0.03em] text-balance">
          {title}
        </h2>
        <p className="max-w-xl text-lg text-muted-foreground">{lead}</p>
        <CtaLink href={href}>{label}</CtaLink>
      </div>
    </section>
  );
}

// Lista con separadores finos, en vez de tarjetas.
export function RuleList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("grid border-t border-border", className)}>{children}</div>;
}
