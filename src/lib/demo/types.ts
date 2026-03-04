export type Money = {
  amount: number;
  currency: "AED" | "USD" | "EUR" | "GBP";
};

export type ApprovalStatus = "pending" | "approved" | "rejected" | "override";

export type AuditEvent = {
  id: string;
  ts: string; // ISO
  actor: string; // "Advisor", "Manager", "System"
  action:
    | "reservation_created"
    | "deposit_requested"
    | "deposit_received"
    | "approval_decision"
    | "evidence_exported";
  detail: string;
};

export type Deposit = {
  requested: boolean;
  receiptRef?: string;
  requestedAt?: string;
  receivedAt?: string;
  money?: Money;
};

export type Approval = {
  status: ApprovalStatus;
  decidedAt?: string;
  decidedBy?: string;
  note?: string;
};

export type Reservation = {
  id: string; // e.g. R-2026-0001
  clientName: string;
  vehicle: string;
  createdAt: string;
  createdBy: string;
  deposit: Deposit;
  approval: Approval;
  audit: AuditEvent[];
};
