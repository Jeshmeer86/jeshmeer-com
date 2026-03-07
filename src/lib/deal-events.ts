import { formatDealStatus } from "@/lib/deal-status";

export const DEAL_EVENT_TYPES = {
  DEAL_CREATED: "DEAL_CREATED",
  NOTE: "NOTE",
  REVIEWED: "REVIEWED",
  STATUS_CHANGED: "STATUS_CHANGED",
  DOCUMENT_UPLOADED: "DOCUMENT_UPLOADED",
  EXPORT_JSON: "EXPORT_JSON",
  EXPORT_HTML: "EXPORT_HTML",
  DEPOSIT_APPROVED: "DEPOSIT_APPROVED",
} as const;

export type DealEventTypeValue =
  (typeof DEAL_EVENT_TYPES)[keyof typeof DEAL_EVENT_TYPES];

type EventPayload = unknown;

function isStatusChangedEventType(type: string) {
  return type === DEAL_EVENT_TYPES.STATUS_CHANGED || type === "STATUS_CHANGE";
}

function isEventPayloadRecord(
  value: EventPayload,
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getStatusTransition(payload: EventPayload) {
  if (!isEventPayloadRecord(payload)) return null;

  const previousStatus =
    typeof payload.previousStatus === "string"
      ? payload.previousStatus
      : typeof payload.from === "string"
        ? payload.from
        : null;
  const newStatus =
    typeof payload.newStatus === "string"
      ? payload.newStatus
      : typeof payload.to === "string"
        ? payload.to
        : null;

  if (!previousStatus && !newStatus) return null;

  return {
    previousStatus,
    newStatus,
  };
}

export function getDealEventMessage(event: {
  type: string;
  message?: string | null;
  payload?: EventPayload;
}) {
  if (event.message?.trim()) return event.message;

  if (event.type === DEAL_EVENT_TYPES.DEAL_CREATED) {
    return "Deal created";
  }

  const statusTransition = getStatusTransition(event.payload);

  if (
    event.type === DEAL_EVENT_TYPES.DOCUMENT_UPLOADED &&
    isEventPayloadRecord(event.payload) &&
    typeof event.payload.fileName === "string"
  ) {
    return `Uploaded document: ${event.payload.fileName}`;
  }

  if (
    isStatusChangedEventType(event.type) &&
    statusTransition?.newStatus
  ) {
    return `Status changed to ${formatDealStatus(statusTransition.newStatus)}`;
  }

  if (event.type === DEAL_EVENT_TYPES.EXPORT_JSON) {
    return "Exported as JSON";
  }
  if (event.type === DEAL_EVENT_TYPES.EXPORT_HTML) {
    return "Exported as HTML";
  }

  return null;
}

export function getDealEventSecondaryText(event: {
  type: string;
  payload?: EventPayload;
}) {
  const statusTransition = getStatusTransition(event.payload);

  if (
    event.type === DEAL_EVENT_TYPES.DEAL_CREATED &&
    isEventPayloadRecord(event.payload) &&
    typeof event.payload.dealNumber === "string"
  ) {
    return `Deal ${event.payload.dealNumber}`;
  }

  if (
    isStatusChangedEventType(event.type) &&
    statusTransition?.previousStatus &&
    statusTransition?.newStatus
  ) {
    return `${formatDealStatus(statusTransition.previousStatus)} -> ${formatDealStatus(statusTransition.newStatus)}`;
  }

  if (
    event.type === DEAL_EVENT_TYPES.DOCUMENT_UPLOADED &&
    isEventPayloadRecord(event.payload) &&
    typeof event.payload.documentType === "string"
  ) {
    return String(event.payload.documentType);
  }

  if (event.type === DEAL_EVENT_TYPES.EXPORT_JSON) {
    return "Deal exported as JSON";
  }
  if (event.type === DEAL_EVENT_TYPES.EXPORT_HTML) {
    return "Deal exported as HTML";
  }

  return null;
}

export function shouldRenderDealEventPayload(event: {
  type: string;
  payload?: EventPayload;
}) {
  return Boolean(
    isEventPayloadRecord(event.payload) &&
    event.type !== DEAL_EVENT_TYPES.DEAL_CREATED &&
    !isStatusChangedEventType(event.type) &&
    event.type !== DEAL_EVENT_TYPES.DOCUMENT_UPLOADED,
  );
}
