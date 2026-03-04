import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PrintButton } from "./PrintButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mini Audit | Sovereign Compliance Systems",
  description:
    "One page mini audit with demo proof pack screenshots: reservations, approvals, audit timeline, and evidence export.",
};

const reportDate = new Date().toISOString().slice(0, 10);

// Edit this per target before sending to a dealership
const clientName = "Luxury Dealership Dubai";

const shots = [
  {
    src: "/proof-pack/mini-audit/mini-audit-01-dashboard.png",
    title: "Reservation and Deposit Dashboard",
    note: "Visibility on reservations, deposits, approvals.",
  },
  {
    src: "/proof-pack/mini-audit/mini-audit-02-timeline.png",
    title: "Audit Timeline View",
    note: "Append only timeline of actions and decisions.",
  },
  {
    src: "/proof-pack/mini-audit/mini-audit-03-approval.png",
    title: "Approval Checkpoints",
    note: "Manager approvals, overrides, and accountability.",
  },
  {
    src: "/proof-pack/mini-audit/mini-audit-04-export.png",
    title: "Evidence Export Pack",
    note: "One click export bundle for disputes and governance.",
  },
  {
    src: "/proof-pack/mini-audit/mini-audit-05-receipt.png",
    title: "Deposit Receipt (Demo)",
    note: "Receipt example generated from the workflow.",
  },
];

export default function MiniAuditPage() {
  return (
    <main className="min-h-screen px-5 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-xs text-white/60">
                Public journey review (no internal access) | {reportDate}
              </div>
              <h1 className="mt-2 text-3xl font-semibold">
                {clientName} | Reservation, Deposit, and Evidence Workflow
              </h1>
              <p className="mt-3 max-w-3xl text-white/70">
                Objective: reduce disputes, tighten approvals, and produce proof
                grade export packs for high value reservations and deposits.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
                href="/demo"
              >
                Open Live Demo
              </Link>
              <Link
                className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
                href="/contact"
              >
                Request a private consult
              </Link>
              <PrintButton />
            </div>
          </div>

          <div className="mt-4 text-xs text-white/50">
            Demo concept UI. No client logos. Screens are illustrative, not
            final bespoke UI.
          </div>
        </div>

        {/* Body */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* Left: One pager text */}
          <section className="lg:col-span-5 space-y-4">
            <Card title="A) What we are trying to improve">
              <ul className="list-disc pl-5 text-sm text-white/75 space-y-2">
                <li>
                  Reduce deposit and handover disputes with proof grade records
                </li>
                <li>
                  Make approvals visible and accountable (who approved what,
                  when)
                </li>
                <li>
                  Produce exportable evidence packs when needed (internal or
                  legal)
                </li>
              </ul>
            </Card>

            <Card title="B) Observations from public journey">
              <ul className="list-disc pl-5 text-sm text-white/75 space-y-2">
                <li>
                  High value VIP journeys where proof and approvals matter
                </li>
                <li>
                  Reservation and deposit conversations often split across
                  email, calls, WhatsApp
                </li>
                <li>
                  Service and ownership journeys benefit from a single customer
                  record and timeline
                </li>
              </ul>
            </Card>

            <Card title="C) Opportunities">
              <ul className="list-disc pl-5 text-sm text-white/75 space-y-2">
                <li>
                  Reservation or deposit hold with receipts plus approvals
                </li>
                <li>
                  Audit timeline per client journey (enquiry to viewing to
                  deposit to delivery)
                </li>
                <li>Evidence export pack (zip) for a one click proof bundle</li>
              </ul>
            </Card>

            <Card title="D) Risks if left as is">
              <ul className="list-disc pl-5 text-sm text-white/75 space-y-2">
                <li>Proof scattered across channels</li>
                <li>Staff changeover causes missing context</li>
                <li>Disputes become slow and reputation sensitive</li>
              </ul>
            </Card>

            <Card title="E) Recommended MVP">
              <div className="text-sm text-white/75">
                <div className="font-medium text-white/85">
                  MVP: Reservation plus Deposit Control Layer
                </div>
                <ul className="mt-3 list-disc pl-5 space-y-2">
                  <li>Deposit request and receipt generation</li>
                  <li>
                    Approval checkpoints (manager approval, override logs)
                  </li>
                  <li>Audit timeline (append only log of actions)</li>
                  <li>
                    Evidence export pack (timeline CSV, receipt PDF,
                    attachments, hashes)
                  </li>
                </ul>
              </div>
            </Card>

            <Card title="F) Timeline">
              <ul className="list-disc pl-5 text-sm text-white/75 space-y-2">
                <li>Week 1: clickable prototype, data model, roles</li>
                <li>Week 2: deposit flow, receipts, admin dashboard</li>
                <li>Week 3: audit timeline, evidence export pack</li>
                <li>Week 4: go live, training, governance handover</li>
              </ul>
            </Card>

            <Card title="G) Next step">
              <div className="text-sm text-white/75">
                15 minute meeting to confirm scope and show the demo screens.
              </div>
            </Card>
          </section>

          {/* Right: Proof pack images */}
          <aside className="lg:col-span-7 space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="text-xs text-white/60">Proof Pack Screens</div>
              <h2 className="mt-2 text-xl font-semibold">Demo screenshots</h2>
              <p className="mt-2 text-sm text-white/70">
                These are the 5 screens used to support the one page audit.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {shots.map((s) => (
                <figure
                  key={s.src}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={s.src}
                      alt={s.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={s.src.includes("01-dashboard")}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-3">
                      <div className="text-xs text-white/70">
                        Demo concept UI
                      </div>
                      <div className="text-sm font-medium">{s.title}</div>
                      <div className="text-xs text-white/70 mt-1">{s.note}</div>
                    </div>
                  </div>
                </figure>
              ))}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/70 backdrop-blur">
              Tip: edit{" "}
              <span className="text-white/85 font-medium">clientName</span> at
              the top of this file per dealership before you send the link.
            </div>
          </aside>
        </div>

        <div className="mt-10 text-xs text-white/40">
          Sovereign Compliance Systems. Demo materials for scope discussion
          only.
        </div>
      </div>
    </main>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
