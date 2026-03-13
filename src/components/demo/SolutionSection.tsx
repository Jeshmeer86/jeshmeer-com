const features = [
  {
    title: "Deal pipeline",
    description:
      "Track every deal from reservation to delivery in a single, organized flow.",
  },
  {
    title: "Reservation and deposit tracking",
    description:
      "Log and monitor all reservations and deposits with full transparency.",
  },
  {
    title: "Document vault",
    description:
      "Securely store, share, and retrieve all deal documents in one place.",
  },
  {
    title: "Timeline and accountability log",
    description:
      "Every action is timestamped and attributed for a clear audit trail.",
  },
  {
    title: "Evidence export pack",
    description:
      "Instantly generate a complete evidence pack for compliance or dispute resolution.",
  },
];

export default function SolutionSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-zinc-950 to-black border-t border-zinc-800">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-white text-center">
          How Sovereign Deal Control solves it
        </h2>
        <div className="grid md:grid-cols-5 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-zinc-900 rounded-xl p-6 shadow-lg border border-zinc-800 flex flex-col items-center text-center"
            >
              <div className="w-10 h-10 mb-3 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <span className="text-yellow-400 text-2xl font-bold">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-yellow-400">
                {f.title}
              </h3>
              <p className="text-zinc-300 text-sm">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
