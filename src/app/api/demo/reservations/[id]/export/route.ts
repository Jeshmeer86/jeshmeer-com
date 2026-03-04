import { NextResponse } from "next/server";
import { getReservation, markExported } from "@/lib/demo/store";
import { buildEvidenceZip } from "@/lib/demo/export";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;

  const r = getReservation(id);
  if (!r) return NextResponse.json({ error: "Not found" }, { status: 404 });

  markExported(id, "System");

  const { zipBytes } = await buildEvidenceZip(r);

  return new NextResponse(zipBytes, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="evidence-pack-${r.id}.zip"`,
      "Cache-Control": "no-store",
    },
  });
}
