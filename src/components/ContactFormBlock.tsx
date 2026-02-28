"use client";

import { useState } from "react";

export function ContactFormBlock() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("sent");
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <div className="glass borderGlow rounded-2xl p-8">
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-2 text-text"
          >
            Name
          </label>
          <input
            required
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2 text-text"
          >
            Email Address
          </label>
          <input
            required
            id="email"
            name="email"
            type="email"
            placeholder="john@company.com"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium mb-2 text-text"
          >
            Message
          </label>
          <textarea
            required
            id="message"
            name="message"
            rows={4}
            placeholder="How can we help?"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className={`w-full py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
            status === "sending"
              ? "bg-muted cursor-not-allowed"
              : "bg-primary text-white hover:opacity-90 active:scale-[0.98]"
          }`}
        >
          {status === "sending" ? "Processing..." : "Send Request"}
        </button>

        {status === "sent" && (
          <p className="text-green-400 text-sm mt-2">
            ✓ Your message has been sent successfully.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm mt-2">
            ✕ Failed to send. Please try again later.
          </p>
        )}
      </form>
    </div>
  );
}
