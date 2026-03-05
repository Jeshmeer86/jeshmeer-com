import { NextResponse } from "next/server";
import { createReservation } from "@/lib/demo/store";

export const runtime = "nodejs";

type Currency = "AED" | "USD" | "EUR" | "GBP";
type Money = { amount: number; currency: Currency };

function parseCurrency(v: unknown): Currency | undefined {
  if (v === "AED" || v === "USD" || v === "EUR" || v === "GBP") return v;
  return undefined;
}

function asNonEmptyString(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim();
  return s.length ? s : null;
}

export async function POST(req: Request) {
  let body: any = null;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const clientName = asNonEmptyString(body?.clientName);
  const vehicle = asNonEmptyString(body?.vehicle);

  if (!clientName || !vehicle) {
    return NextResponse.json(
      { error: "Missing fields: clientName and vehicle are required" },
      { status: 400 },
    );
  }

  // Optional createdBy
  const createdBy = asNonEmptyString(body?.createdBy) ?? "system";

  // Optional depositMoney
  const rawAmount = body?.depositMoney?.amount;
  const rawCurrency = body?.depositMoney?.currency;

  let depositMoney: Money | undefined = undefined;

  if (rawAmount != null || rawCurrency != null) {
    const currency = parseCurrency(rawCurrency);
    if (!currency) {
      return NextResponse.json(
        { error: "Unsupported currency. Use AED, USD, EUR, or GBP." },
        { status: 400 },
      );
    }

    const amount = Number(rawAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid deposit amount. Must be a number greater than 0." },
        { status: 400 },
      );
    }

    depositMoney = { amount, currency };
  }

  const r = await createReservation({
    clientName,
    vehicle,
    createdBy,
    depositMoney,
  });

  return NextResponse.json({ reservation: r }, { status: 201 });
}
