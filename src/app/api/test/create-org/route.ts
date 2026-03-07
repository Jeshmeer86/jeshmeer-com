// src/app/api/test/create-org/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Not allowed in production" },
      { status: 403 },
    );
  }
  const { orgId, name } = await req.json();
  if (!orgId || !name) {
    return NextResponse.json(
      { error: "orgId and name required" },
      { status: 400 },
    );
  }
  const org = await prisma.org.upsert({
    where: { id: orgId },
    update: { name },
    create: { id: orgId, name, type: "DEALER" },
  });
  return NextResponse.json({ orgId: org.id });
}
