"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { methodSteps } from "@/lib/venture-lab";
import { arcPath, polar } from "./cycle-geometry";
import { cn } from "@/lib/utils";

// Inspirado en el Krebs Cycle of Creativity de Neri Oxman: cada etapa
// transforma algo y se lo entrega a la siguiente (causa), y devuelve feedback a
// la anterior para mejorarla o consolidarla. Escalar vuelve a Descubrir.

const R_OUT = 200; // borde exterior
const R_MID = 138; // anillo de transformaciones
const R_IN = 78; // núcleo: el equipo

const N = methodSteps.length;
const STEP = 360 / N;
const centerAngle = (i: number) => -90 + i * STEP;

// Lo que cada etapa produce y entrega a la siguiente.
const outputs = ["hipótesis", "evidencia", "producto", "clientes", "nuevos desafíos"];
// Feedback: lo que cada etapa devuelve a la anterior para mejorarla o consolidarla.
const feedback = [
  "foco sobre qué vale la pena seguir escalando",
  "aprendizajes que afinan el problema",
  "límites técnicos y costos reales",
  "uso real y mejoras para el producto",
  "datos para consolidar el modelo",
];
const verbs = ["Exploración", "Experimento", "Creación", "Conexión", "Crecimiento"];
const core = [
  { label: "Consultoría", angle: -90 },
  { label: "Tecnología", angle: 30 },
  { label: "Redes", angle: 150 },
];

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
    const id = window.setInterval(() => setActive((a) => (a + 1) % N), 3200);
    return () => window.clearInterval(id);
  }, [touched]);

  const pick = (i: number) => {
    setTouched(true);
    setActive(i);
  };

  const step = methodSteps[active];
  const next = methodSteps[(active + 1) % N];
  const prev = methodSteps[(active - 1 + N) % N];

  return (
    <div className="grid items-center gap-10 rounded-3xl bg-noche p-6 text-white md:p-10 lg:grid-cols-[1.25fr_1fr]">
      <svg
        viewBox="-400 -262 800 530"
        className="w-full h-auto select-none"
        role="group"
        aria-label="Ciclo del método GOXT"
      >
        <defs>
          <radialGradient id="mc-out" cx="50%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#1d4a5c" />
            <stop offset="100%" stopColor="#0d2a4a" />
          </radialGradient>
          <marker id="mc-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff" />
          </marker>
          <marker id="mc-arrow-back" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#f5a524" />
          </marker>
        </defs>

        {/* Anillos */}
        <circle r={R_OUT} fill="url(#mc-out)" />
        <circle r={R_MID} fill="#0a2238" />
        <circle r={R_IN} fill="#071a2c" />

        {/* Sector activo */}
        <path
          d={wedge(R_MID, R_OUT, centerAngle(active) - STEP / 2, centerAngle(active) + STEP / 2)}
          fill="#00b5d8"
          fillOpacity={0.22}
          className="transition-all duration-700"
        />

        {/* Divisiones punteadas entre etapas, como en el ciclo de Krebs */}
        {methodSteps.map((_, i) => {
          const a = centerAngle(i) + STEP / 2;
          const p0 = polar(R_IN * 0.15, a);
          const p1 = polar(R_OUT + 30, a);
          return <line key={i} x1={p0.x} y1={p0.y} x2={p1.x} y2={p1.y} stroke="#ffffff" strokeOpacity={0.35} strokeDasharray="1.5 4" />;
        })}

        {/* Flechas en cada paso: hacia adelante la causa, hacia atrás el feedback */}
        {methodSteps.map((_, i) => {
          const a = centerAngle(i) + STEP / 2;
          const forwardOn = i === active;
          const backOn = (i + 1) % N === active;
          return (
            <g key={i}>
              <path
                d={arcPath(R_IN + 38, a - 13, a + 13)}
                fill="none"
                stroke="#ffffff"
                strokeWidth={2}
                strokeDasharray="2 3"
                markerEnd="url(#mc-arrow)"
                opacity={forwardOn ? 1 : 0.45}
                className="transition-opacity duration-700"
              />
              <path
                d={arcPath(R_IN + 18, a - 13, a + 13)}
                fill="none"
                stroke="#f5a524"
                strokeWidth={2}
                strokeDasharray="2 3"
                markerStart="url(#mc-arrow-back)"
                opacity={backOn ? 1 : 0.4}
                className="transition-opacity duration-700"
              />
            </g>
          );
        })}


        {/* Transformaciones: lo que cada etapa entrega a la siguiente */}
        {outputs.map((o, i) => {
          const a = centerAngle(i) + STEP / 2;
          const p = polar((R_MID + R_OUT) / 2, a);
          const on = i === active;
          return (
            <text
              key={o}
              x={p.x}
              y={p.y + 4}
              textAnchor="middle"
              className={cn("text-[12px] transition-all duration-700", on ? "font-semibold" : "")}
              fill={on ? "#00b5d8" : "#ffffff"}
              fillOpacity={on ? 1 : 0.75}
            >
              {o}
            </text>
          );
        })}

        {/* Núcleo: un solo equipo */}
        {core.map((c) => {
          const p = polar(R_IN * 0.55, c.angle);
          return (
            <text key={c.label} x={p.x} y={p.y + 4} textAnchor="middle" className="text-[10.5px]" fill="#ffffff" fillOpacity={0.8}>
              {c.label}
            </text>
          );
        })}

        {/* Etapas alrededor del círculo */}
        {methodSteps.map((s, i) => {
          const a = centerAngle(i);
          const p = polar(R_OUT + 40, a);
          const anchor = Math.abs(Math.cos((a * Math.PI) / 180)) < 0.3 ? "middle" : Math.cos((a * Math.PI) / 180) > 0 ? "start" : "end";
          const on = i === active;
          return (
            <g
              key={s.name}
              tabIndex={0}
              role="button"
              aria-label={s.name}
              aria-pressed={on}
              className="cursor-pointer outline-none"
              onMouseEnter={() => pick(i)}
              onFocus={() => pick(i)}
              onClick={() => pick(i)}
            >
              <path d={wedge(R_MID, R_OUT + 70, a - STEP / 2, a + STEP / 2)} fill="transparent" />
              <text
                x={p.x}
                y={p.y}
                textAnchor={anchor}
                className="text-[24px] transition-all duration-700"
                fill={on ? "#00b5d8" : "#ffffff"}
                fontWeight={on ? 600 : 400}
              >
                {s.name}
              </text>
              <text x={p.x} y={p.y + 20} textAnchor={anchor} className="text-[12px]" fill="#ffffff" fillOpacity={0.65}>
                {verbs[i]}
              </text>
            </g>
          );
        })}
      </svg>

      <div aria-live="polite" className="flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cian">
          Etapa {active + 1} de {N}
        </p>
        <h3 className="text-3xl md:text-4xl font-medium tracking-tight">{step.name}</h3>
        <p className="text-white/75 md:text-lg">{step.text}</p>
        <p className="text-sm text-white/60">
          Entregable: <span className="text-white">{step.deliverable}</span>
        </p>
        <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/15 p-4 text-sm">
          <span className="shrink-0 text-white/60">Esto activa</span>
          <ArrowRight size={16} className="shrink-0 text-white" />
          <span className="font-medium">
            {outputs[active]} para {next.name.toLowerCase()}
          </span>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-white/15 p-4 text-sm">
          <span className="shrink-0 text-white/60">Devuelve a {prev.name}</span>
          <ArrowLeft size={16} className="shrink-0 text-ambar" />
          <span className="font-medium">{feedback[active]}</span>
        </div>
        <div className="flex flex-col gap-1 text-xs text-white/60">
          <span><span className="text-white">→</span> Causa: lo que una etapa provoca en la siguiente.</span>
          <span><span className="text-ambar">←</span> Feedback: lo que devuelve a la anterior para mejorarla o consolidarla.</span>
        </div>
        <div className="flex gap-2 pt-2">
          {methodSteps.map((s, i) => (
            <button
              key={s.name}
              onClick={() => pick(i)}
              aria-label={`Ver ${s.name}`}
              className={cn("h-1.5 rounded-full transition-all duration-500", i === active ? "w-8 bg-cian" : "w-4 bg-white/25 hover:bg-white/50")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
