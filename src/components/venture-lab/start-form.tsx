"use client";

import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, type FieldError as RHFError, type UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpRight, CheckCircle2, LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

// Plataformas con inicio autónomo: el usuario crea su workspace en la propia plataforma.
const PLATFORMS = [
  { value: "NETGROW", label: "NETGROW · crecimiento comercial", url: "https://crm.goxt.io" },
  { value: "CARGO", label: "CARGO · transporte y logística", url: "https://cargo.goxt.io" },
] as const;

const PROFILES = ["Empresa", "Pyme o emprendimiento", "Institución educativa", "Persona independiente"];
const ROLES = ["Dueño o gerente general", "Gerencia o jefatura comercial", "Operaciones o logística", "Administración y finanzas", "Otro"];
const TEAM_SIZES = ["Solo yo", "2 a 5", "6 a 20", "21 a 100", "Más de 100"];
const GOALS = ["Vender más", "Ordenar clientes y seguimiento", "Ganar eficiencia en la operación", "Decidir con datos", "Otro"];

const schema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  email: z.string().email("Correo inválido"),
  company: z.string().min(2, "Empresa o proyecto requerido"),
  country: z.string().min(2, "País requerido"),
  profile: z.string().min(1, "Selecciona una opción"),
  role: z.string().min(1, "Selecciona una opción"),
  teamSize: z.string().min(1, "Selecciona una opción"),
  platform: z.string().min(1, "Selecciona una plataforma"),
  goal: z.string().min(1, "Selecciona una opción"),
});

type FormData = z.infer<typeof schema>;

const selectClass = (empty: boolean) =>
  cn(
    "flex h-9 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm transition-colors outline-none",
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
    empty && "text-muted-foreground"
  );

function SelectField({
  id,
  label,
  options,
  placeholder,
  error,
  empty,
  register,
}: {
  id: keyof FormData;
  label: string;
  options: readonly { value: string; label: string }[] | string[];
  placeholder: string;
  error?: RHFError;
  empty: boolean;
  register: UseFormRegister<FormData>;
}) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>
        {label} <span className="text-destructive">*</span>
      </FieldLabel>
      <select id={id} aria-invalid={!!error} className={selectClass(empty)} {...register(id)}>
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((o) => {
          const opt = typeof o === "string" ? { value: o, label: o } : o;
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
      <FieldError errors={[error]} />
    </Field>
  );
}

export default function StartForm() {
  const [done, setDone] = useState<FormData | null>(null);
  const sent = useRef(false);
  const params = useSearchParams();
  const initialPlatform = PLATFORMS.find((p) => p.value === params.get("plataforma"))?.value ?? "";

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      country: "Chile",
      profile: "",
      role: "",
      teamSize: "",
      platform: initialPlatform,
      goal: "",
    },
  });

  const v = watch();

  const onSubmit = async (data: FormData) => {
    if (sent.current) return;
    sent.current = true;
    const notes = [
      `Plataforma: ${data.platform}`,
      `Perfil: ${data.profile}`,
      `Cargo: ${data.role}`,
      `Equipo: ${data.teamSize}`,
      `Objetivo: ${data.goal}`,
      `País: ${data.country}`,
    ].join("\n");
    const res = await fetch("/api/demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "registro", name: data.name, email: data.email, company: data.company, notes }),
    });
    if (!res.ok) {
      sent.current = false;
      setError("root", { message: "No pudimos guardar tus datos. Intenta de nuevo." });
      return;
    }
    setDone(data);
  };

  if (done) {
    const platform = PLATFORMS.find((p) => p.value === done.platform) ?? PLATFORMS[0];
    return (
      <div className="flex flex-col items-start gap-5 rounded-3xl border border-border bg-card p-8 md:p-10">
        <CheckCircle2 className="size-10 text-cian" />
        <div>
          <h2 className="text-2xl font-medium tracking-tight">Listo, {done.name.split(" ")[0]}</h2>
          <p className="mt-2 text-muted-foreground">
            Ya tenemos tu perfil. Ahora crea tu workspace en {platform.value} con el correo{" "}
            <strong className="text-foreground">{done.email}</strong> y empieza a usarlo.
          </p>
        </div>
        <a
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground"
        >
          Crear mi workspace en {platform.value}
          <ArrowUpRight size={16} />
        </a>
        <p className="text-sm text-muted-foreground">
          ¿Quieres verla funcionando antes? <a href="/demo" className="underline underline-offset-4">Inscríbete en la demo semanal</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-8 md:p-10">
      <div>
        <h2 className="text-xl font-semibold">Cuéntanos de ti</h2>
        <p className="text-sm text-muted-foreground">Un minuto. Con esto dejamos tu workspace listo para tu realidad.</p>
      </div>
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="name">
              Nombre <span className="text-destructive">*</span>
            </FieldLabel>
            <Input id="name" aria-invalid={!!errors.name} placeholder="Ej: Ana Rojas" {...register("name")} />
            <FieldError errors={[errors.name]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">
              Correo de trabajo <span className="text-destructive">*</span>
            </FieldLabel>
            <Input id="email" type="email" aria-invalid={!!errors.email} placeholder="ana@empresa.cl" {...register("email")} />
            <FieldError errors={[errors.email]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="company">
              Empresa o proyecto <span className="text-destructive">*</span>
            </FieldLabel>
            <Input id="company" aria-invalid={!!errors.company} {...register("company")} />
            <FieldError errors={[errors.company]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="country">
              País <span className="text-destructive">*</span>
            </FieldLabel>
            <Input id="country" aria-invalid={!!errors.country} {...register("country")} />
            <FieldError errors={[errors.country]} />
          </Field>
          <SelectField id="platform" label="Plataforma" options={PLATFORMS} placeholder="Elige una" error={errors.platform} empty={!v.platform} register={register} />
          <SelectField id="profile" label="¿Qué te describe mejor?" options={PROFILES} placeholder="Elige una" error={errors.profile} empty={!v.profile} register={register} />
          <SelectField id="role" label="Tu rol" options={ROLES} placeholder="Elige una" error={errors.role} empty={!v.role} register={register} />
          <SelectField id="teamSize" label="Personas que usarán la plataforma" options={TEAM_SIZES} placeholder="Elige un rango" error={errors.teamSize} empty={!v.teamSize} register={register} />
        </div>
        <SelectField id="goal" label="¿Qué quieres lograr primero?" options={GOALS} placeholder="Elige una" error={errors.goal} empty={!v.goal} register={register} />
        {errors.root && <p className="text-sm text-destructive">{errors.root.message}</p>}
        <Button size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <LoaderIcon className="mr-2 size-4 animate-spin" />
              Guardando...
            </>
          ) : (
            "Continuar y crear mi workspace"
          )}
        </Button>
        <p className="text-xs text-muted-foreground">
          Al continuar aceptas los <a href="/terminos" className="underline">términos</a> y la{" "}
          <a href="/privacidad" className="underline">política de privacidad</a>.
        </p>
      </FieldGroup>
    </form>
  );
}
