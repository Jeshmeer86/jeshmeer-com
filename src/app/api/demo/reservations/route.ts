import { NextResponse } from "next/server";
import { createReservation } from "@/lib/demo/store";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body?.clientName || !body?.vehicle) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const createdBy = String(body.createdBy || "Advisor");
  const depositMoney =
    body.depositAmount && body.depositCurrency
      ? {
          amount: Number(body.depositAmount),
          currency: String(body.depositCurrency),
        }
      : undefined;

  const r = createReservation({
    clientName: String(body.clientName),
    vehicle: String(body.vehicle),
    createdBy,
    depositMoney,
  });

  return NextResponse.json({ reservation: r }, { status: 201 });
}
