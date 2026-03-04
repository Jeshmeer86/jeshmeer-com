import crypto from "crypto";
import type { Reservation, AuditEvent, Money, ApprovalStatus } from "./types";

type Store = {
  reservations: Map<string, Reservation>;
};

function isoNow() {
  return new Date().toISOString();
}

function event(
  actor: string,
  action: AuditEvent["action"],
  detail: string,
): AuditEvent {
  return {
    id: crypto.randomUUID(),
    ts: isoNow(),
    actor,
    action,
    detail,
  };
}

function makeId() {
  const yyyy = new Date().getFullYear();
  const n = Math.floor(Math.random() * 9000) + 1000;
  return `R-${yyyy}-${n}`;
}

function getStore(): Store {
  const g = globalThis as unknown as { __SOV_DEMO_STORE__?: Store };
  if (!g.__SOV_DEMO_STORE__) {
    const reservations = new Map<string, Reservation>();

    const seedId = `R-2026-0001`;
    const seeded: Reservation = {
      id: seedId,
      clientName: "Demo Client",
      vehicle: "Ferrari Class Spec (Demo)",
      createdAt: isoNow(),
      createdBy: "Advisor",
      deposit: {
        requested: true,
        requestedAt: isoNow(),
        receiptRef: "RCPT-DEMO-0192",
        money: { amount: 250000, currency: "AED" },
      },
      approval: {
        status: "pending",
      },
      audit: [
        event(
          "Advisor",
          "reservation_created",
          "Reservation record created (demo).",
        ),
        event(
          "Advisor",
          "deposit_requested",
          "Deposit requested. Receipt ref generated.",
        ),
      ],
    };

    reservations.set(seedId, seeded);
    g.__SOV_DEMO_STORE__ = { reservations };
  }
  return g.__SOV_DEMO_STORE__;
}

export function listReservations(): Reservation[] {
  return Array.from(getStore().reservations.values()).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

export function getReservation(id: string): Reservation | null {
  return getStore().reservations.get(id) ?? null;
}

export function createReservation(input: {
  clientName: string;
  vehicle: string;
  createdBy: string;
  depositMoney?: Money;
}): Reservation {
  const id = makeId();
  const createdAt = isoNow();

  const depositRequested = Boolean(input.depositMoney);

  const r: Reservation = {
    id,
    clientName: input.clientName.trim(),
    vehicle: input.vehicle.trim(),
    createdAt,
    createdBy: input.createdBy.trim() || "Advisor",
    deposit: depositRequested
      ? {
          requested: true,
          requestedAt: createdAt,
          receiptRef: `RCPT-${id}`,
          money: input.depositMoney,
        }
      : { requested: false },
    approval: { status: "pending" },
    audit: [
      event(
        input.createdBy || "Advisor",
        "reservation_created",
        "Reservation record created.",
      ),
      ...(depositRequested
        ? [
            event(
              input.createdBy || "Advisor",
              "deposit_requested",
              "Deposit requested. Receipt ref generated.",
            ),
          ]
        : []),
    ],
  };

  getStore().reservations.set(id, r);
  return r;
}

export function setDepositReceived(id: string, actor: string) {
  const r = getReservation(id);
  if (!r) return null;

  const now = isoNow();
  r.deposit.receivedAt = now;

  r.audit.push(event(actor, "deposit_received", "Deposit marked as received."));
  return r;
}

export function decideApproval(
  id: string,
  actor: string,
  status: ApprovalStatus,
  note?: string,
) {
  const r = getReservation(id);
  if (!r) return null;

  const now = isoNow();
  r.approval.status = status;
  r.approval.decidedAt = now;
  r.approval.decidedBy = actor;
  r.approval.note = note?.slice(0, 240);

  r.audit.push(
    event(
      actor,
      "approval_decision",
      `Decision: ${status}${note ? ` | Note: ${note}` : ""}`,
    ),
  );

  return r;
}

export function markExported(id: string, actor: string) {
  const r = getReservation(id);
  if (!r) return null;
  r.audit.push(
    event(actor, "evidence_exported", "Evidence export pack generated."),
  );
  return r;
}
