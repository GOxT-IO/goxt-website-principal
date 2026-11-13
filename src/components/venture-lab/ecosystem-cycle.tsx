"use client";

import { segments, type SegmentSlug } from "@/lib/venture-lab";
import { arcPath, bladePath, polar } from "./cycle-geometry";
import { cn } from "@/lib/utils";

const R = 130; // radio del isotipo
const RING = 168; // anillo de los flujos

export const cycleNodes: { slug: SegmentSlug; angle: number; label: string }[] = [
  { slug: "empresas", angle: -90, label: "Empresas" },
  { slug: "emprendedores", angle: 30, label: "Emprendedores" },
  { slug: "instituciones", angle: 150, label: "Instituciones" },
];

// Cada público transforma algo y se lo entrega al siguiente (causa y efecto).
const flows = [
  { from: "empresas", to: "emprendedores", label: "desafíos y primeros clientes" },
  { from: "emprendedores", to: "instituciones", label: "ventures e impacto" },
  { from: "instituciones", to: "empresas", label: "talento y proyectos" },
] as const;

const angleOf = (slug: SegmentSlug) => cycleNodes.find((n) => n.slug === slug)!.angle;

function labelArc(r: number, a0: number, a1: number) {
  // En la mitad inferior el texto se dibuja al revés para que se lea de izquierda a derecha.
  let end = a1;
  while (end < a0) end += 360;
  const mid = (a0 + end) / 2;
  const lower = Math.sin((mid * Math.PI) / 180) > 0.2;
  if (!lower) return arcPath(r, a0, end);
  const p0 = polar(r, end);
  const p1 = polar(r, a0);
  return `M ${p0.x.toFixed(2)} ${p0.y.toFixed(2)} A ${r} ${r} 0 0 0 ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`;
}

export default function EcosystemCycle({
  active,
  onActive,
  className,
}: {
  active: SegmentSlug;
  onActive: (slug: SegmentSlug) => void;
  className?: string;
}) {
  return (
    <svg
      viewBox="-235 -225 470 460"
      className={cn("w-full h-auto overflow-visible select-none", className)}
      role="group"
      aria-label="Ciclo GOXT: instituciones, empresas y emprendedores conectados"
    >
      <defs>
        <marker id="flow-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-current" />
        </marker>
      </defs>

      <circle r={R} className="fill-papel-1" />

      {/* Flujos entre públicos: el anillo exterior del ciclo */}
      {flows.map((fl) => {
        const a0 = angleOf(fl.from) + 14;
        const a1 = angleOf(fl.to) - 14;
        const on = fl.from === active || fl.to === active;
        const id = `flow-${fl.from}`;
        return (
          <g key={id} className={cn("transition-colors duration-700", on ? "text-cian" : "text-border")}>
            <path
              d={arcPath(RING, a0, a1)}
              fill="none"
              stroke="currentColor"
              strokeWidth={on ? 2 : 1.25}
              markerEnd="url(#flow-arrow)"
              className="transition-all duration-700"
            />
            <path id={id} d={labelArc(RING + 14, a0, a1)} fill="none" />
            <text
              className={cn(
                "text-[11px] tracking-wide transition-all duration-700",
                on ? "fill-foreground font-medium" : "fill-muted-foreground"
              )}
              dy={labelArc(RING + 14, a0, a1).includes(" 0 0 0 ") ? 10 : -2}
            >
              <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
                {fl.label}
              </textPath>
            </text>
          </g>
        );
      })}

      {/* El isotipo: borde y tres trazos, uno por público */}
      <circle r={R} fill="none" className="stroke-tinta" strokeWidth={2.5} />
      {cycleNodes.map((n) => {
        const on = n.slug === active;
        return (
          <path
            key={n.slug}
            d={bladePath(R, n.angle)}
            fill="none"
            strokeWidth={on ? 7 : 5}
            strokeLinecap="round"
            className={cn(
              "cursor-pointer transition-all duration-700",
              on ? "stroke-cian" : "stroke-tinta/75 hover:stroke-tinta"
            )}
            onMouseEnter={() => onActive(n.slug)}
            onClick={() => onActive(n.slug)}
          />
        );
      })}

      {/* Nodos y etiquetas */}
      {cycleNodes.map((n) => {
        const on = n.slug === active;
        const p = polar(R, n.angle);
        const lp = polar(R + (n.angle === -90 ? 52 : 50), n.angle);
        const seg = segments.find((s) => s.slug === n.slug)!;
        return (
          <a
            key={n.slug}
            href={`/${n.slug}`}
            aria-label={seg.selector}
            onMouseEnter={() => onActive(n.slug)}
            onFocus={() => onActive(n.slug)}
            className="outline-none"
          >
            <circle cx={p.x} cy={p.y} r={on ? 11 : 8} className={cn("transition-all duration-700", on ? "fill-cian" : "fill-background stroke-foreground")} strokeWidth={2.5} />
            <text
              x={lp.x}
              y={lp.y + 5}
              textAnchor="middle"
              className={cn("text-[15px] font-semibold transition-colors duration-700", on ? "fill-foreground" : "fill-muted-foreground")}
            >
              {n.label}
            </text>
          </a>
        );
      })}
    </svg>
  );
}
