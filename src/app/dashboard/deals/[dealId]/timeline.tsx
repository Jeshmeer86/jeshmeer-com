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
    <div className="rounded border border-zinc-800 bg-black/60">
      <div className="divide-y divide-zinc-800">
        {events.map((event) => (
          <div key={event.id} className="p-3 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-gold-300">
                {event.type.replace(/_/g, " ")}
              </span>
              <span className="opacity-60">
                {new Date(event.createdAt).toLocaleString("en-GB", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
              {event.actorId ? (
                <span className="rounded border border-zinc-700 px-2 py-0.5 text-xs bg-zinc-900 text-zinc-200">
                  {event.actor?.name
                    ? event.actor.name
                    : event.actor?.email || event.actorId}
                </span>
              ) : null}
            </div>
            <div className="mt-1 text-zinc-300">
              {event.message || (
                <span className="italic">No details provided</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
