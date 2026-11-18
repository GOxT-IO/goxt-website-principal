import type { Metadata } from "next";
import PageShell from "@/components/venture-lab/page-shell";
import { SegmentPage } from "@/components/venture-lab/blocks";
import { segments } from "@/lib/venture-lab";

const segment = segments.find((s) => s.slug === "empresas")!;

export const metadata: Metadata = {
  title: "Empresas",
  description: segment.lead,
  openGraph: { title: `Empresas | GOXT Venture Lab`, description: segment.lead, url: "https://goxt.io/empresas" },
};

export default function Page() {
  return (
    <PageShell>
      <SegmentPage segment={segment} />
    </PageShell>
  );
}
