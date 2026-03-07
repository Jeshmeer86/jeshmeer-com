import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Not allowed in production" },
      { status: 403 },
    );
  }

  const body = (await req.json().catch(() => null)) as {
    dealId?: string;
  } | null;
  const dealId = body?.dealId;

  if (!dealId) {
    return NextResponse.json({ error: "dealId required" }, { status: 400 });
  }

  await prisma.$transaction([
    prisma.dealEvent.deleteMany({ where: { dealId } }),
    prisma.dealDocument.deleteMany({ where: { dealId } }),
    prisma.deposit.deleteMany({ where: { dealId } }),
    prisma.evidenceFile.deleteMany({ where: { dealId } }),
    prisma.exportBundle.deleteMany({ where: { dealId } }),
    prisma.deal.deleteMany({ where: { id: dealId } }),
  ]);

  return NextResponse.json({ ok: true });
}
