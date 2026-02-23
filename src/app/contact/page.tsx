"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { site } from "@/content/site";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <Container>
      <Section
        title="Contact"
        subtitle={`${site.pricingNote}. We work with reputable, branded businesses.`}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass borderGlow rounded-2xl p-6">
            <div className="text-sm font-semibold">Private consult request</div>
            <p className="mt-2 text-sm text-muted">
              AI and automation are built into every system. Tell us what you sell, and what the workflow must achieve.
            </p>

            <form className="mt-5 grid gap-3" onSubmit={onSubmit}>
              <input className="rounded-xl border border-line bg-bg px-3 py-2 text-sm" name="company" placeholder="Company name" required />
              <input className="rounded-xl border border-line bg-bg px-3 py-2 text-sm" name="industry" placeholder="Industry (example: luxury automotive)" required />
              <input className="rounded-xl border border-line bg-bg px-3 py-2 text-sm" name="projectRange" placeholder="Project range (100k+ AED)" required />
              <textarea className="min-h-[120px] rounded-xl border border-line bg-bg px-3 py-2 text-sm" name="message" placeholder="What do you want the system to do?" required />
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-bg hover:opacity-90 disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Send"}
              </button>

              {status === "sent" ? (
                <div className="text-sm text-gold">Sent. We will respond with a private consult invite.</div>
              ) : null}
              {status === "error" ? (
                <div className="text-sm text-danger">Something went wrong. Please email us directly.</div>
              ) : null}
            </form>
          </div>

          <div className="glass borderGlow rounded-2xl p-6">
            <div className="text-sm font-semibold">Direct</div>
            <div className="mt-3 text-sm text-muted">
              Email: <span className="text-text">{site.contactEmail}</span>
            </div>
            <div className="mt-3 text-sm text-muted">
              Focus: luxury automotive, then luxury property, then hospitals and medical centers.
            </div>

            <div className="mt-6 rounded-2xl border border-line bg-bg p-4">
              <div className="text-xs font-semibold text-muted">Note</div>
              <div className="mt-2 text-xs text-muted">
                In-house counsel supports governance and documentation within client engagements.
                No public legal representation is offered.
              </div>
            </div>
          </div>
        </div>
      </Section>

      <div className="py-10" />
    </Container>
  );
}
