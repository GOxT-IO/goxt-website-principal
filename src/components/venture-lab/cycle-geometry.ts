// Geometría compartida por los ciclos inspirados en el isotipo de GOXT.

export function polar(r: number, deg: number, cx = 0, cy = 0) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

const f = (n: number) => n.toFixed(2);

// Arco sobre una circunferencia, de a0 a a1 en sentido horario (grados).
export function arcPath(r: number, a0: number, a1: number) {
  const p0 = polar(r, a0);
  const p1 = polar(r, a1);
  let sweep = a1 - a0;
  while (sweep < 0) sweep += 360;
  const large = sweep > 180 ? 1 : 0;
  return `M ${f(p0.x)} ${f(p0.y)} A ${r} ${r} 0 ${large} 1 ${f(p1.x)} ${f(p1.y)}`;
}

// Un trazo del isotipo: nace en el borde y gira hacia el centro.
// Orientado para que nazca en el ángulo `a` (grados).
export function bladePath(R: number, a: number) {
  const p0 = polar(R, a);
  const c1 = polar(R * 1.12, a + 78);
  const c2 = polar(R * 0.5, a + 150);
  const p1 = polar(R * 0.42, a + 228);
  return `M ${f(p0.x)} ${f(p0.y)} C ${f(c1.x)} ${f(c1.y)} ${f(c2.x)} ${f(c2.y)} ${f(p1.x)} ${f(p1.y)}`;
}
