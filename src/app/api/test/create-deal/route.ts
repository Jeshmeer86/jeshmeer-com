// src/app/api/test/create-deal/route.ts
import { NextResponse, type NextRequest } from "next/server";
import {
  createDealWithEvent,
  isPrismaUniqueConstraintError,
} from "@/lib/deals";

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Not allowed in production" },
      { status: 403 },
    );
  }
  const { orgId, dealNumber } = await req.json();
  if (!orgId || !dealNumber) {
    return NextResponse.json(
      { error: "orgId and dealNumber required" },
      { status: 400 },
    );
  }

  try {
    const deal = await createDealWithEvent({ orgId, dealNumber });
    return NextResponse.json({ dealId: deal.id });
  } catch (error) {
    if (isPrismaUniqueConstraintError(error)) {
      return NextResponse.json(
        { error: "Deal number already exists for this organization" },
        { status: 409 },
      );
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
