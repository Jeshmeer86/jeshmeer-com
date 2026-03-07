export const DEAL_DOCUMENT_TYPES = [
  "ID_DOCUMENT",
  "RESERVATION_FORM",
  "DEPOSIT_RECEIPT",
  "VEHICLE_DOCUMENT",
  "FINANCE_DOCUMENT",
  "HANDOVER_DOCUMENT",
  "OTHER",
] as const;

export type DealDocumentTypeValue = (typeof DEAL_DOCUMENT_TYPES)[number];

export const DEAL_DOCUMENT_TYPE_LABELS: Record<DealDocumentTypeValue, string> =
  {
    ID_DOCUMENT: "ID document",
    RESERVATION_FORM: "Reservation form",
    DEPOSIT_RECEIPT: "Deposit receipt",
    VEHICLE_DOCUMENT: "Vehicle document",
    FINANCE_DOCUMENT: "Finance document",
    HANDOVER_DOCUMENT: "Handover document",
    OTHER: "Other",
  };

export const ALLOWED_DEAL_DOCUMENT_MIME_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
] as const;

export const MAX_DEAL_DOCUMENT_SIZE_BYTES = 10 * 1024 * 1024;

export function isDealDocumentType(
  value: unknown,
): value is DealDocumentTypeValue {
  return (
    typeof value === "string" &&
    DEAL_DOCUMENT_TYPES.includes(value as DealDocumentTypeValue)
  );
}

export function isAllowedDealDocumentMimeType(
  value: unknown,
): value is (typeof ALLOWED_DEAL_DOCUMENT_MIME_TYPES)[number] {
  return (
    typeof value === "string" &&
    ALLOWED_DEAL_DOCUMENT_MIME_TYPES.includes(
      value as (typeof ALLOWED_DEAL_DOCUMENT_MIME_TYPES)[number],
    )
  );
}

export function formatDealDocumentSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function getDealDocumentMimeLabel(mimeType: string) {
  if (mimeType === "application/pdf") return "PDF";
  if (mimeType === "image/png") return "PNG image";
  if (mimeType === "image/jpeg") return "JPEG image";
  return mimeType;
}
