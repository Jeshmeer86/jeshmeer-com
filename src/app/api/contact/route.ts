import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json();
  // For production: connect to your email provider (Resend, SMTP, etc).
  // This route is intentionally minimal and safe.
  console.log("Contact payload:", payload);
  return NextResponse.json({ ok: true });
}
