"use client";

import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoaderIcon, CalendarIcon, CheckCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const CALENDAR_URL = "https://calendar.app.google/1nbeEzv7YSstAzQL8";

const SERVICES = [
  { value: "Power Skills", label: "Un programa para mi institución" },
  { value: "Desarrollo",   label: "Innovar o desarrollar en mi empresa" },
  { value: "Mentoría",     label: "Validar o hacer crecer mi idea" },
  { value: "Plataformas",  label: "Plataformas NETGROW, CARGO o BI" },
  { value: "Otro",         label: "Otro" },
];

const schema = z.object({
  name:      z.string().min(2, "Nombre requerido"),
  email:     z.string().email("Correo inválido"),
  company:   z.string().min(2, "Empresa requerida"),
  service:   z.string().min(1, "Selecciona una opción"),
  challenge: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

function buildNotes(data: FormData): string {
  const lines = [`Servicio: ${data.service}`];
  if (data.challenge?.trim()) lines.push(`Desafío: ${data.challenge.trim()}`);
  return lines.join("\n");
}

export default function DiagnosticoSection() {
  const [submitted, setSubmitted] = useState(false);
  const hasSubmitted = useRef(false);
  const searchParams = useSearchParams();

  const serviceParam = SERVICES.find(
    (s) => s.value === searchParams.get("service")
  )?.value ?? "";

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", company: "", service: serviceParam, challenge: "" },
  });

  const serviceVal = watch("service");

  const onSubmit = async (data: FormData) => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;

    const res = await fetch("/api/diagnostico", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:    data.name,
        email:   data.email,
        company: data.company,
        notes:   buildNotes(data),
      }),
    });

    if (!res.ok) {
      hasSubmitted.current = false;
      setError("root", { message: "No pudimos enviar tu solicitud. Intenta de nuevo." });
      return;
    }

    setSubmitted(true);
  };

  return (
    <section className="pt-20 md:pt-32 pb-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">

          {/* Columna izquierda */}
          <div className="flex flex-1 flex-col gap-8">
            <div>
              <h1 className="mb-6 text-[40px] leading-[1.08] md:text-[64px] md:leading-[1.05] font-medium tracking-[-0.03em]">
                Conversemos
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Cuéntanos tu desafío o tu idea. En 30 minutos entendemos dónde estás y te proponemos el siguiente paso.
              </p>
            </div>
            <ul className="grid border-t border-border">
              {["Sin costo y sin compromiso", "Te respondemos en menos de 24 horas", "Hablas con el equipo que hace el trabajo"].map((t) => (
                <li key={t} className="border-b border-border py-4">{t}</li>
              ))}
            </ul>
          </div>

          {/* Columna derecha — formulario */}
          <div className="flex-1">
            {submitted ? (
              <div className="flex flex-col gap-6 rounded-2xl border border-border p-8 md:p-10 h-full justify-center items-center text-center">
                <CheckCircleIcon className="size-10" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">¡Solicitud recibida!</h2>
                  <p className="text-sm text-muted-foreground">
                    Te escribimos en menos de 24 horas para coordinar la conversación.
                  </p>
                </div>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                  <p className="text-sm font-medium">¿Quieres elegir el horario ahora?</p>
                  <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full gap-2">
                      <CalendarIcon className="size-4" />
                      Agendar reunión
                    </Button>
                  </a>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6 rounded-2xl border border-border p-8 md:p-10"
              >
                <div>
                  <h2 className="text-xl font-medium">Cuéntanos de ti</h2>
                </div>

                <FieldGroup>
                  {/* Nombre */}
                  <Field>
                    <FieldLabel htmlFor="name">
                      Nombre completo <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="name"
                      aria-invalid={!!errors.name}
                      placeholder="Ej: Juan Pérez"
                      {...register("name")}
                    />
                    <FieldError errors={[errors.name]} />
                  </Field>

                  {/* Email */}
                  <Field>
                    <FieldLabel htmlFor="email">
                      Correo electrónico <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      aria-invalid={!!errors.email}
                      placeholder="Ej: juan@empresa.cl"
                      {...register("email")}
                    />
                    <FieldError errors={[errors.email]} />
                  </Field>

                  {/* Empresa */}
                  <Field>
                    <FieldLabel htmlFor="company">
                      Empresa <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="company"
                      aria-invalid={!!errors.company}
                      placeholder="Empresa, institución o proyecto"
                      {...register("company")}
                    />
                    <FieldError errors={[errors.company]} />
                  </Field>

                  {/* Servicio */}
                  <Field>
                    <FieldLabel htmlFor="service">
                      ¿Qué te trae a GOXT? <span className="text-destructive">*</span>
                    </FieldLabel>
                    <select
                      id="service"
                      aria-invalid={!!errors.service}
                      className={cn(
                        "flex h-9 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm transition-colors outline-none",
                        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
                        !serviceVal && "text-muted-foreground",
                      )}
                      {...register("service")}
                    >
                      <option value="" disabled hidden>Elige una opción</option>
                      {SERVICES.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                    <FieldError errors={[errors.service]} />
                  </Field>

                  {/* Desafío opcional */}
                  <Field>
                    <FieldLabel htmlFor="challenge">¿Cuéntanos tu desafío? (opcional)</FieldLabel>
                    <Textarea
                      id="challenge"
                      placeholder="Cuéntanos en pocas palabras tu desafío o tu idea"
                      rows={3}
                      {...register("challenge")}
                    />
                  </Field>

                  {errors.root && (
                    <p className="text-sm text-destructive">{errors.root.message}</p>
                  )}

                  <Button
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <LoaderIcon className="mr-2 size-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar"
                    )}
                  </Button>
                </FieldGroup>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
