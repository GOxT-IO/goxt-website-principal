// Contenido central de GOXT Venture Lab.
// Regla: no publicar nombres de clientes sin autorización escrita.

export const BRAND = {
  name: "GOXT Venture Lab",
  tagline: "Del desafío al resultado",
  promise:
    "Convertimos desafíos e ideas en resultados: diagnosticamos, construimos la tecnología y te conectamos con la red para crecer, con un solo equipo.",
};

export type SegmentSlug = "instituciones" | "empresas" | "emprendedores";

export type Segment = {
  slug: SegmentSlug;
  selector: string;
  eyebrow: string;
  title: string;
  lead: string;
  buyer: string;
  jobs: string[];
  pains: string[];
  offer: { name: string; detail: string }[];
  gains: string[];
  valueMoment: { label: string; steps: string[]; days: string };
  cta: { label: string; href: string };
};

export const segments: Segment[] = [
  {
    slug: "instituciones",
    selector: "Soy una institución",
    eyebrow: "Universidades, institutos, colegios y centros de innovación",
    title: "Programas de emprendimiento que terminan en resultados que puedes reportar",
    lead:
      "Diseñamos y ejecutamos programas llave en mano: formación, mentoría, retos reales de empresas y un equipo técnico que prototipa los mejores proyectos.",
    buyer: "Direcciones de Innovación, Emprendimiento y Vinculación con el Medio",
    jobs: [
      "Diseñar y ejecutar programas de emprendimiento",
      "Conectar a estudiantes con empresas",
      "Demostrar impacto ante acreditación y autoridades",
    ],
    pains: [
      "Baja participación y proyectos que mueren tras el pitch",
      "Poca evidencia de impacto para reportar",
      "Falta de capacidad técnica para prototipar",
    ],
    offer: [
      { name: "Power Skills", detail: "Semestres, extracurriculares y bootcamps de innovación y emprendimiento." },
      { name: "Incubación de proyectos", detail: "Mentoría recurrente y seguimiento de KPIs para los mejores equipos." },
      { name: "Demo Day", detail: "Los proyectos se presentan frente a empresas, mentores e inversionistas." },
      { name: "Laboratorio de innovación abierta", detail: "Retos reales de empresas resueltos por tus estudiantes." },
    ],
    gains: [
      "Reporte de impacto listo para acreditación",
      "Convenios con empresas de la red",
      "Proyectos y startups nacidos en tu institución",
    ],
    valueMoment: {
      label: "Primer grupo de participantes con proyectos definidos",
      steps: ["Reunión de diseño del programa", "Convocatoria co-firmada", "Kick-off", "Primer reporte de avance"],
      days: "30 días desde la firma",
    },
    cta: { label: "Agenda una sesión de diseño de programa", href: "/diagnostico?service=Power%20Skills" },
  },
  {
    slug: "empresas",
    selector: "Soy una empresa",
    eyebrow: "Empresas que quieren innovar, digitalizarse o crecer",
    title: "Tu equipo de innovación y tecnología, del diagnóstico al resultado en producción",
    lead:
      "Un solo equipo que entiende tu negocio, valida la oportunidad y construye la solución. Sin informes que quedan en un cajón ni pilotos que no escalan.",
    buyer: "Gerencia General, Innovación, Operaciones y Personas",
    jobs: [
      "Detectar oportunidades y lanzar nuevas líneas de negocio",
      "Digitalizar y ordenar la operación",
      "Formar intraemprendedores",
    ],
    pains: [
      "Pilotos que no escalan",
      "Consultoras que entregan informes y no resultados",
      "Proveedores de software que no entienden el negocio",
    ],
    offer: [
      { name: "Venture building corporativo", detail: "Diagnóstico, validación, MVP y lanzamiento de nuevas líneas de negocio." },
      { name: "Desarrollo a medida", detail: "Plataformas, integraciones, automatización e IA aplicadas a tu operación." },
      { name: "Plataformas GOXT", detail: "NETGROW, CARGO y BI listas para configurar en días, no meses." },
      { name: "Intraemprendimiento", detail: "Programas Power Skills aplicados a los desafíos de tu propia empresa." },
    ],
    gains: [
      "Nuevos ingresos y eficiencia medible",
      "Acceso a talento y startups de la red",
      "Cultura de innovación que se nota",
    ],
    valueMoment: {
      label: "Primer entregable tangible: mapa de oportunidades o prototipo navegable",
      steps: ["Diagnóstico en 24 h", "Taller con la gerencia", "Sprint de 2 semanas", "Demo a la gerencia"],
      days: "21 días",
    },
    cta: { label: "Pide tu diagnóstico de oportunidades", href: "/diagnostico?service=Desarrollo" },
  },
  {
    slug: "emprendedores",
    selector: "Tengo una idea o un negocio",
    eyebrow: "Emprendedores, profesionales y pymes",
    title: "De la idea al negocio, sin arriesgar todos tus ahorros",
    lead:
      "Te acompañamos a validar tu idea antes de programar, construir tu MVP con un equipo técnico real y llegar a tus primeros clientes.",
    buyer: "Fundadores, profesionales que quieren independizarse y dueños de pymes",
    jobs: ["Validar la idea", "Construir el producto", "Conseguir clientes y financiamiento"],
    pains: [
      "No saber por dónde partir",
      "No tener socio técnico",
      "Miedo a perder los ahorros",
    ],
    offer: [
      { name: "Taller abierto de validación", detail: "Una sesión online mensual y gratuita para ordenar tu idea." },
      { name: "Sprint de validación", detail: "4 semanas de diagnóstico, entrevistas y prototipo." },
      { name: "Programa de incubación", detail: "12 semanas en grupo, con mentor asignado y Demo Day." },
      { name: "MVP sobre plataforma GOXT", detail: "Tu producto construido sobre tecnología probada." },
    ],
    gains: [
      "Primeras ventas",
      "Comunidad y mentores",
      "Credibilidad ante inversionistas y fondos",
    ],
    valueMoment: {
      label: "Idea validada con 10 entrevistas y un prototipo",
      steps: ["Bienvenida por WhatsApp", "Perfil del proyecto", "Asignación de mentor", "Primera sesión de validación"],
      days: "14 días",
    },
    cta: { label: "Postula al próximo programa", href: "/diagnostico?service=Mentor%C3%ADa" },
  },
];

export const pillars = [
  {
    title: "Construimos, no solo aconsejamos",
    text: "Entregamos producto funcionando, no informes. Ya lo hicimos con nuestras propias plataformas.",
  },
  {
    title: "Todo en un equipo",
    text: "Consultoría, desarrollo tecnológico, formación y redes integradas en un mismo equipo.",
  },
  {
    title: "Una red que abre puertas",
    text: "Empresas, universidades, centros de innovación, instituciones y mentores en Latinoamérica.",
  },
];

export const methodSteps = [
  {
    name: "Descubrir",
    text: "Diagnóstico del desafío o de la idea: qué problema vale la pena resolver y para quién.",
    deliverable: "Mapa de oportunidades y KPIs",
  },
  {
    name: "Validar",
    text: "Entrevistas, prototipo y prueba con usuarios reales antes de invertir en desarrollo.",
    deliverable: "Prototipo validado",
  },
  {
    name: "Construir",
    text: "MVP o plataforma con el equipo de desarrollo de GOXT, sobre tecnología probada.",
    deliverable: "Producto funcionando",
  },
  {
    name: "Lanzar",
    text: "Primeros clientes, Demo Day y conexión con la red de empresas e instituciones.",
    deliverable: "Primeros usuarios y ventas",
  },
  {
    name: "Escalar",
    text: "Mentoría, seguimiento de KPIs, financiamiento y nuevos mercados.",
    deliverable: "Crecimiento medible",
  },
];

export type Product = {
  name: string;
  category: string;
  text: string;
  features: string[];
  href: string;
  external?: boolean;
  image?: string;
};

// Productos independientes: cada uno funciona y se vende por sí solo,
// y forma parte del ecosistema GOXT Venture Lab.
export const products: Product[] = [
  {
    name: "NETGROW",
    category: "Crecimiento comercial",
    text: "CRM para ordenar clientes, oportunidades y cotizaciones, con agente de IA integrado.",
    features: ["Pipeline visual", "Cotizaciones en minutos", "Seguimiento automático", "Agente IA"],
    href: "https://crm.goxt.io",
    external: true,
    image: "/assets/features/CRM.jpg",
  },
  {
    name: "CARGO",
    category: "Transporte y logística",
    text: "Software para dadores de carga: contratos de transporte, despachos y seguimiento en un solo lugar.",
    features: ["Digitalización logística", "Control de contratos", "Seguimiento de despachos"],
    href: "https://cargo.goxt.io",
    external: true,
    image: "/assets/features/Cargo.jpg",
  },
  {
    name: "BI",
    category: "Inteligencia de negocio",
    text: "Tableros e indicadores para decidir con datos de tu operación y tu área comercial.",
    features: ["Tableros por área", "KPIs en tiempo real", "Datos conectados"],
    href: "/diagnostico?service=Plataformas",
    image: "/assets/features/BI.jpg",
  },
  {
    name: "Power Skills",
    category: "Formación e innovación",
    text: "Programas de innovación, emprendimiento y human skills para instituciones, empresas y personas.",
    features: ["Programas académicos", "Bootcamps y talleres", "Demo Day"],
    href: "/skills",
    image: "/assets/Conferencia.jpg",
  },
];

export const networkGroups = [
  {
    title: "Universidades e institutos",
    text: "Instituciones de Chile, México y Colombia con las que diseñamos y ejecutamos programas de emprendimiento.",
  },
  {
    title: "Centros de innovación",
    text: "Aliados que levantan desafíos de empresas y conectan ecosistemas, como NODO Centro de Innovación.",
  },
  {
    title: "Empresas",
    text: "Compañías que traen retos reales, presupuesto y la posibilidad de ser primeros clientes.",
  },
  {
    title: "Mentores y expertos",
    text: "Más de 100 mentores y especialistas que acompañan a los equipos en cada etapa.",
  },
];
