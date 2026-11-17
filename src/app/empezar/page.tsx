import type { Metadata } from "next";
import PageShell from "@/components/venture-lab/page-shell";
import { Eyebrow } from "@/components/venture-lab/primitives";
import { ArrowUpRight } from "lucide-react";
import { platformPricing, products } from "@/lib/venture-lab";

// Inicio autónomo: el perfil del usuario se pide dentro de cada plataforma, en su onboarding.
const platforms = products.filter((p) => p.name === "NETGROW" || p.name === "CARGO").map((p) => ({ ...p, url: p.href }));

const description =
  "Crea tu workspace en NETGROW o CARGO y empieza a usarlo hoy, por tu cuenta. Sin esperar una reunión.";

export const metadata: Metadata = {
  title: "Empieza ahora",
  description,
  openGraph: { title: "Empieza ahora | GOXT Venture Lab", description, url: "https://goxt.io/empezar" },
};

const steps = [
  { t: "Crea tu cuenta", d: "Entras a la plataforma con tu correo." },
  { t: "Configura tu workspace", d: "Respondes unas preguntas básicas y la plataforma se ajusta a tu negocio." },
  { t: "Empieza a usarla", d: "Invita a tu equipo y carga tus primeros datos, a tu ritmo." },
];

export default function EmpezarPage() {
  return (
    <PageShell>
      <section className="max-w-6xl mx-auto px-4 md:px-6 pt-12 md:pt-20 pb-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr]">
          <div className="flex flex-col gap-6">
            <Eyebrow>Inicio autónomo</Eyebrow>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-balance">
              Empieza hoy, por tu cuenta
            </h1>
            <p className="text-muted-foreground md:text-lg">{description}</p>
            <ol className="flex flex-col gap-4">
              {steps.map((s, i) => (
                <li key={s.t} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cian/15 text-sm font-semibold text-cian">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium">{s.t}</p>
                    <p className="text-sm text-muted-foreground">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-sm text-muted-foreground">
              Precio normal {platformPricing.base} {platformPricing.unit}. Desde 3 usuarios tienes descuento de
              entrada el primer año. <a href="/planes" className="underline underline-offset-4">Ver planes</a>
            </p>
            <p className="text-sm text-muted-foreground">
              ¿Prefieres verla funcionando primero?{" "}
              <a href="/demo" className="underline underline-offset-4">Inscríbete en la demo semanal</a>.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {platforms.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 rounded-3xl border border-border bg-card p-8 transition hover:border-cian"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cian">{p.category}</p>
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-semibold tracking-tight">{p.name}</h2>
                  <ArrowUpRight size={20} className="text-muted-foreground transition group-hover:rotate-45 group-hover:text-foreground" />
                </div>
                <p className="text-muted-foreground">{p.text}</p>
                <span className="mt-2 inline-flex h-11 w-fit items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground">
                  Crear mi workspace en {p.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
