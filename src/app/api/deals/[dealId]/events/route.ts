

import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ dealId: string }> }
) {
  const { dealId } = await ctx.params;
  const { userId, orgId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!orgId) return NextResponse.json({ error: "Organization required" }, { status: 400 });

  const deal = await prisma.deal.findFirst({ where: { id: dealId, orgId } });
  if (!deal) return NextResponse.json({ error: "Deal not found" }, { status: 404 });

  const events = await prisma.dealEvent.findMany({
    where: { dealId },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json({ events });
}


export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ dealId: string }> }
) {
  const { dealId } = await ctx.params;
  const { userId, orgId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!orgId) return NextResponse.json({ error: "Organization required" }, { status: 400 });

  const deal = await prisma.deal.findFirst({ where: { id: dealId, orgId } });
  if (!deal) return NextResponse.json({ error: "Deal not found" }, { status: 404 });

  const body = (await req.json().catch(() => null)) as { message?: string } | null;
  const message = body?.message?.trim();
  if (!message) return NextResponse.json({ error: "Message required" }, { status: 400 });

  const event = await prisma.dealEvent.create({
    data: {
      dealId,
      type: "NOTE",
      message,
    },
  });
  return NextResponse.json({ event }, { status: 201 });
}
