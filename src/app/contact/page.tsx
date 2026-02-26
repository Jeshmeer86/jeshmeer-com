"use client";

import { useState, useEffect, useRef } from "react";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { site } from "@/content/site";
export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

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
    <div>
      <Container>
        <Section
          title="Contact"
          subtitle={`${site.pricingNote}. We work with reputable, branded businesses.`}
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="glass borderGlow rounded-2xl p-6">
              <div className="text-sm font-semibold">
                Private consult request
              </div>
              <p className="mt-2 text-sm text-muted">
                AI and automation are built into every system. Tell us what you
                sell, and what the workflow must achieve.
              </p>
              <form className="mt-5 grid gap-3" onSubmit={onSubmit}>
                <input
                  className="rounded-xl border border-line bg-bg px-3 py-2 text-sm"
                  name="company"
                  placeholder="Company name"
                  required
                />
                <input
                  className="rounded-xl border border-line bg-bg px-3 py-2 text-sm"
                  name="industry"
                  placeholder="Industry (example: luxury automotive)"
                  required
                />
                <input
                  className="rounded-xl border border-line bg-bg px-3 py-2 text-sm"
                  name="projectRange"
                  placeholder="Project range (100k+ AED)"
                  required
                />
                <textarea
                  className="min-h-[120px] rounded-xl border border-line bg-bg px-3 py-2 text-sm"
                  name="message"
                  placeholder="What do you want the system to do?"
                  required
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-xl bg-gold px-6 py-3 text-base font-semibold text-bg hover:opacity-90 disabled:opacity-60"
                >
                  {status === "sending" ? "Sending..." : "Send"}
                </button>
                {status === "sent" && (
                  <div className="text-sm text-gold">
                    Sent. We will respond with a private consult invite.
                  </div>
                )}
                {status === "error" && (
                  <div className="text-sm text-danger">
                    Something went wrong. Please email us directly.
                  </div>
                )}
              </form>
            </div>
            <div className="glass borderGlow rounded-2xl p-6">
              <div className="text-sm font-semibold">Direct</div>
              <div className="mt-3 text-sm text-muted">
                Email: <span className="text-text">{site.contactEmail}</span>
              </div>
              <div className="mt-3 text-sm text-muted">
                Number: +97156 87 44 925
              </div>
              <div className="mt-3 text-sm text-muted">
                Focus: luxury automotive, luxury property, hospitals and medical centers.
              </div>
              <div className="mt-6 rounded-2xl border border-line bg-bg p-4">
                <div className="text-xs font-semibold text-muted">Note</div>
                <div className="mt-2 text-xs text-muted">
                  In-house counsel supports governance and documentation within
                  client engagements.
                </div>
              </div>
            </div>
          </div>
          {/* WhatsApp Section */}
          <div className="glass borderGlow rounded-2xl p-6 flex flex-col items-center justify-center">
            <div className="text-sm font-semibold mb-2">
              Contact us on WhatsApp
            </div>
            <a
              href="https://wa.me/971568744925"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-green-500 hover:bg-green-600 px-6 py-3 text-base font-semibold text-white transition-colors duration-200 shadow-md"
              style={{ minWidth: 180, justifyContent: "center" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 13.487c-.263-.131-1.558-.77-1.799-.858-.241-.088-.417-.131-.593.132-.175.263-.676.858-.828 1.033-.151.175-.304.197-.567.066-.263-.132-1.111-.409-2.117-1.304-.782-.696-1.31-1.556-1.464-1.819-.151-.263-.016-.405.115-.536.118-.117.263-.304.395-.456.132-.151.175-.263.263-.438.087-.175.044-.329-.022-.46-.066-.132-.593-1.433-.813-1.963-.214-.514-.432-.444-.593-.452-.151-.007-.329-.009-.505-.009-.175 0-.46.066-.701.329-.241.263-.92.899-.92 2.188 0 1.289.942 2.537 1.073 2.713.132.175 1.853 2.832 4.492 3.86.629.271 1.12.433 1.503.553.632.201 1.208.173 1.663.105.507-.075 1.558-.637 1.779-1.253.22-.616.22-1.144.154-1.253-.066-.109-.241-.175-.504-.307z"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="9.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              WhatsApp
            </a>
            {/* WhatsApp number removed as requested */}
          </div>
        </Section>
      </Container>
    </div>
  );
}
