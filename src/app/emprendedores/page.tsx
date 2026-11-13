import type { Metadata } from "next";
import PageShell from "@/components/venture-lab/page-shell";
import { SegmentPage } from "@/components/venture-lab/blocks";
import { segments } from "@/lib/venture-lab";

const segment = segments.find((s) => s.slug === "emprendedores")!;

export const metadata: Metadata = {
  title: "Emprendedores",
  description: segment.lead,
  openGraph: { title: `Emprendedores | GOXT Venture Lab`, description: segment.lead, url: "https://goxt.io/emprendedores" },
};

export default function Page() {
  return (
    <PageShell>
      <SegmentPage segment={segment} />
    </PageShell>
  );
}
