"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { arcPath, polar } from "./cycle-geometry";
import { cn } from "@/lib/utils";

// Basado en el Krebs Cycle of Creativity de Neri Oxman.
// La ciencia observa la naturaleza (y a las personas, que son naturaleza) y
// genera conocimiento; la ingeniería lo lleva a la práctica creando
// herramientas; el diseño las hace usables y las adapta a cada realidad; el
// arte observa cómo las personas viven con ellas, cuestiona y provoca, y eso
// es nueva información para la ciencia.

const R_OUT = 200;
const R_MID = 136;
const R_IN = 74;

type Domain = {
  name: string;
  angle: number; // centro del cuadrante
  role: string;
  text: string;
  stages: string[];
  gives: string; // lo que entrega al siguiente
};

const domains: Domain[] = [
  {
    name: "Ciencia",
    angle: -45,
    role: "Observar",
    text: "Observamos a las personas y su entorno, el problema real, y lo convertimos en conocimiento que se puede comprobar.",
    stages: ["Descubrir", "Validar"],
    gives: "Conocimiento",
  },
  {
    name: "Ingeniería",
    angle: 45,
    role: "Llevar a la práctica",
    text: "Tomamos ese conocimiento y construimos herramientas que funcionan: productos, plataformas y procesos.",
    stages: ["Construir"],
    gives: "Utilidad",
  },
  {
    name: "Diseño",
    angle: 135,
    role: "Hacer usable",
    text: "Hacemos que esas herramientas sean fáciles de usar y las ajustamos a la realidad de cada institución, empresa o persona.",
    stages: ["Lanzar"],
    gives: "Comportamiento",
  },
  {
    name: "Arte",
    angle: 225,
    role: "Cuestionar",
    text: "Miramos cómo las personas y las organizaciones viven con lo que creamos, lo cuestionamos y provocamos nuevas preguntas.",
    stages: ["Escalar"],
    gives: "Información",
  },
];

// Las transformaciones quedan en los ejes, entre un dominio y el siguiente.
const transitionAngle = (i: number) => domains[i].angle + 45;

function wedge(r0: number, r1: number, a0: number, a1: number) {
  const p0 = polar(r1, a0);
  const p1 = polar(r1, a1);
  const p2 = polar(r0, a1);
  const p3 = polar(r0, a0);
  return `M ${p0.x} ${p0.y} A ${r1} ${r1} 0 0 1 ${p1.x} ${p1.y} L ${p2.x} ${p2.y} A ${r0} ${r0} 0 0 0 ${p3.x} ${p3.y} Z`;
}

export default function MethodCycle() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % domains.length), 4200);
    return () => window.clearInterval(id);
  }, [touched]);

  const pick = (i: number) => {
    setTouched(true);
    setActive(i);
  };

  const d = domains[active];
  const next = domains[(active + 1) % domains.length];

  return (
    <div className="grid items-center gap-10 rounded-3xl bg-noche p-6 text-white md:p-10 lg:grid-cols-[1.2fr_1fr]">
      <svg viewBox="-330 -262 660 524" className="w-full h-auto select-none text-white" role="group" aria-label="Ciclo GOXT: ciencia, ingeniería, diseño y arte">
        <defs>
          <radialGradient id="mc-out" cx="50%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#1d4a5c" />
            <stop offset="100%" stopColor="#0d2a4a" />
          </radialGradient>
          <marker id="mc-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>

        <circle r={R_OUT} fill="url(#mc-out)" />
        <path
          d={wedge(R_MID, R_OUT, d.angle - 45, d.angle + 45)}
          className="fill-cian/25 transition-all duration-700"
        />
        <circle r={R_MID} fill="#0a2238" />
        <circle r={R_IN} fill="#071a2c" />

        {/* Ejes punteados, como en el ciclo original */}
        {[0, 90].map((a) => {
          const p0 = polar(R_OUT + 40, a);
          const p1 = polar(R_OUT + 40, a + 180);
          return <line key={a} x1={p0.x} y1={p0.y} x2={p1.x} y2={p1.y} stroke="currentColor" strokeOpacity={0.35} strokeDasharray="1.5 4" />;
        })}
        {[45, 135].map((a) => {
          const p0 = polar(R_OUT + 12, a);
          const p1 = polar(R_OUT + 12, a + 180);
          return <line key={a} x1={p0.x} y1={p0.y} x2={p1.x} y2={p1.y} stroke="currentColor" strokeOpacity={0.25} strokeDasharray="1.5 4" />;
        })}

        {/* Mitades: arriba se observa, abajo se produce */}
        <text x={-322} y={-10} className="text-[12px]" fill="currentColor" fillOpacity={0.7}>Observar</text>
        <text x={-322} y={22} className="text-[12px]" fill="currentColor" fillOpacity={0.7}>Producir</text>
        <text x={-8} y={-R_OUT - 22} textAnchor="end" className="text-[12px]" fill="currentColor" fillOpacity={0.7}>Personas</text>
        <text x={8} y={-R_OUT - 22} className="text-[12px]" fill="currentColor" fillOpacity={0.7}>Naturaleza</text>

        {/* Transformaciones en el anillo exterior */}
        {domains.map((dm, i) => {
          const a = transitionAngle(i);
          const p = polar((R_MID + R_OUT) / 2, a);
          const on = i === active;
          return (
            <text
              key={dm.gives}
              x={p.x}
              y={p.y + 4}
              textAnchor="middle"
              className={cn("text-[13px] transition-all duration-700", on && "font-semibold")}
              fill="currentColor"
              fillOpacity={on ? 1 : 0.7}
            >
              {dm.gives}
            </text>
          );
        })}

        {/* Flechas en el anillo medio: un solo sentido, sin cortes */}
        {domains.map((dm, i) => {
          const a = dm.angle;
          return (
            <path
              key={i}
              d={arcPath(R_MID - 30, a - 10, a + 10)}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.4}
              strokeDasharray="2 3"
              markerEnd="url(#mc-arrow)"
              opacity={i === active ? 0.95 : 0.4}
              className="transition-opacity duration-700"
            />
          );
        })}

        <text y={-4} textAnchor="middle" className="text-[12px] font-medium" fill="currentColor">Personas y</text>
        <text y={12} textAnchor="middle" className="text-[12px] font-medium" fill="currentColor">naturaleza</text>

        {/* Dominios */}
        {domains.map((dm, i) => {
          const p = polar(R_OUT + 42, dm.angle);
          const right = Math.cos((dm.angle * Math.PI) / 180) > 0;
          const on = i === active;
          return (
            <g
              key={dm.name}
              tabIndex={0}
              role="button"
              aria-label={dm.name}
              aria-pressed={on}
              className="cursor-pointer outline-none"
              onMouseEnter={() => pick(i)}
              onFocus={() => pick(i)}
              onClick={() => pick(i)}
            >
              <path d={wedge(R_MID, R_OUT + 80, dm.angle - 45, dm.angle + 45)} fill="transparent" />
              <text
                x={p.x}
                y={p.y}
                textAnchor={right ? "start" : "end"}
                className={cn("text-[28px] transition-all duration-700", on ? "fill-cian font-semibold" : "")}
                fill={on ? undefined : "currentColor"}
              >
                {dm.name}
              </text>
              <text x={p.x} y={p.y + 20} textAnchor={right ? "start" : "end"} className="text-[12px]" fill="currentColor" fillOpacity={0.7}>
                {dm.stages.join(" · ")}
              </text>
            </g>
          );
        })}
      </svg>

      <div aria-live="polite" className="flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cian">{d.role}</p>
        <h3 className="text-3xl md:text-4xl font-medium tracking-tight">{d.name}</h3>
        <p className="text-white/75 md:text-lg">{d.text}</p>
        <p className="text-sm text-white/60">
          {d.stages.length > 1 ? "Etapas del método: " : "Etapa del método: "}
          <span className="font-medium text-white">{d.stages.join(" y ")}</span>
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3 rounded-2xl border border-white/15 p-4 text-sm">
          <span className="text-white/60">Entrega</span>
          <span className="font-medium">{d.gives.toLowerCase()}</span>
          <ArrowRight size={16} className="text-ambar" />
          <span className="font-medium">{next.name}</span>
        </div>
        <div className="flex gap-2 pt-2">
          {domains.map((dm, i) => (
            <button
              key={dm.name}
              onClick={() => pick(i)}
              aria-label={`Ver ${dm.name}`}
              className={cn("h-1.5 rounded-full transition-all duration-500", i === active ? "w-8 bg-cian" : "w-4 bg-white/25 hover:bg-white/50")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
