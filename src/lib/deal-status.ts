import { DealStatus } from "@prisma/client";

export const DEAL_STATUS_FLOW: readonly DealStatus[] = [
  DealStatus.NEW,
  DealStatus.RESERVED,
  DealStatus.DEPOSIT_RECEIVED,
  DealStatus.IN_FINANCE,
  DealStatus.COMPLETED,
  DealStatus.CANCELLED,
];

export const DEAL_STATUS_LABELS: Record<DealStatus, string> = {
  [DealStatus.NEW]: "New",
  [DealStatus.RESERVED]: "Reserved",
  [DealStatus.DEPOSIT_RECEIVED]: "Deposit Received",
  [DealStatus.IN_FINANCE]: "In Finance",
  [DealStatus.COMPLETED]: "Completed",
  [DealStatus.CANCELLED]: "Cancelled",
};

export function isDealStatus(value: string): value is DealStatus {
  return Object.values(DealStatus).includes(value as DealStatus);
}

export function formatDealStatus(status: string) {
  return DEAL_STATUS_LABELS[status as DealStatus] ?? status.replaceAll("_", " ");
}