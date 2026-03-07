import {
  DEAL_EVENT_TYPES,
  getDealEventMessage,
  getDealEventSecondaryText,
  shouldRenderDealEventPayload,
} from "@/lib/deal-events";

type TimelineEvent = {
  id: string;
  type: string;
  actorId: string | null;
  message: string | null;
  payload: unknown;
  createdAt: string;
  actor?: {
    name?: string | null;
    email?: string | null;
    id?: string;
  } | null;
};

export default function DealTimeline({ events }: { events: TimelineEvent[] }) {
  if (events.length === 0) {
    return <div className="text-sm opacity-80">No events yet.</div>;
  }

  return (
    <div className="rounded border">
      <div className="divide-y">
        {events.map((event) => (
          <div key={event.id} className="p-3 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium">{event.type}</span>
              <span className="opacity-60">
                {new Date(event.createdAt).toLocaleString()}
              </span>
              {event.actorId ? (
                <span className="rounded border px-2 py-0.5 text-xs">
                  {event.actor?.name
                    ? event.actor.name
                    : event.actor?.email
                      ? event.actor.email
                      : `actor: ${event.actorId}`}
                </span>
              ) : null}
            </div>
            {getDealEventMessage(event) ? (
              <div className="mt-1 whitespace-pre-line">
                {getDealEventMessage(event)}
              </div>
            ) : null}
            {getDealEventSecondaryText(event) ? (
              <div className="mt-1 text-xs opacity-70">
                {event.type === DEAL_EVENT_TYPES.DOCUMENT_UPLOADED
                  ? `Type: ${getDealEventSecondaryText(event)}`
                  : getDealEventSecondaryText(event)}
              </div>
            ) : null}
            {shouldRenderDealEventPayload(event) && event.payload ? (
              <pre className="mt-2 overflow-x-auto rounded border p-2 text-xs">
                {typeof event.payload === "object"
                  ? JSON.stringify(event.payload, null, 2)
                  : String(event.payload)}
              </pre>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
