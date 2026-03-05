import { NextResponse } from "next/server";

/**
 * Next.js 15 route handler params are async.
 * You must await params to read id.
 */
type Ctx = { params: Promise<{ id: string }> };

// If you already have these functions in this file, keep them.
// If they live elsewhere, import them here instead.
function setDepositReceived(id: string, actor: string) {
  // TODO: replace with your existing logic
  return { id, actor, status: "DEPOSIT_RECEIVED" };
}

function decideApproval(
  id: string,
  actor: string,
  status: "approved" | "rejected" | "overridden",
  note?: string,
) {
  // TODO: replace with your existing logic
  return { id, actor, status, note };
}

export async function GET(req: Request, { params }: Ctx) {
  const { id } = await params;

  const body = await req.json().catch(() => ({}) as any);
  const action = String(body?.action || "");
  const actor = body?.actor ? String(body.actor) : "system";

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  if (action === "mark_deposit_received") {
    const r = setDepositReceived(id, actor);
    if (!r) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ reservation: r });
  }

  if (action === "approve" || action === "reject" || action === "override") {
    const note = body?.note ? String(body.note) : undefined;
    const status =
      action === "approve"
        ? "approved"
        : action === "reject"
          ? "rejected"
          : "overridden";

    const r = decideApproval(id, actor, status, note);
    if (!r) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ reservation: r });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
