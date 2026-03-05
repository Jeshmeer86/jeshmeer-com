import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { requireDashboardContext } from "@/lib/tenant";

export async function GET() {
  const ctx = await requireDashboardContext();
  if (!ctx.ok)
    return NextResponse.json({ error: ctx.reason === "SIGN_IN" ? "Unauthorized" : "Organization required" }, { status: ctx.reason === "SIGN_IN" ? 401 : 400 });


  const deals = await prisma.deal.findMany({
    where: { orgId: ctx.dbOrgId },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json({ deals });
}

export async function POST(req: Request) {
  const ctx = await requireDashboardContext();
  if (!ctx.ok)
    return NextResponse.json({ error: ctx.reason === "SIGN_IN" ? "Unauthorized" : "Organization required" }, { status: ctx.reason === "SIGN_IN" ? 401 : 400 });


  const body = (await req.json().catch(() => null)) as {
    dealNumber?: string;
  } | null;
  const dealNumber = body?.dealNumber?.trim();

  if (!dealNumber) {
    return NextResponse.json({ error: "dealNumber required" }, { status: 400 });
  }

  try {
    const deal = await prisma.deal.create({
      data: { dealNumber, orgId: ctx.dbOrgId },
    });

    return NextResponse.json({ deal }, { status: 201 });
  } catch (e: any) {
    if (e?.code === "P2002") {
      return NextResponse.json(
        { error: "Deal number already exists for this organization" },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
