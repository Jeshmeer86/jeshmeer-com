const outcomes = [
  {
    title: "Reduce dispute risk",
    description:
      "Clear records and workflows minimize the chance of costly disputes.",
  },
  {
    title: "Improve staff accountability",
    description: "Every action is tracked, so responsibility is always clear.",
  },
  {
    title: "Give management clear oversight",
    description:
      "Real-time dashboards and logs provide instant visibility for leaders.",
  },
];

export default function OutcomeSection() {
  return (
    <section className="py-20 bg-black border-t border-zinc-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-white text-center">
          Business outcomes
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {outcomes.map((o, i) => (
            <div
              key={i}
              className="bg-zinc-900 rounded-xl p-6 shadow-lg border border-zinc-800"
            >
              <h3 className="font-bold text-lg mb-2 text-yellow-400">
                {o.title}
              </h3>
              <p className="text-zinc-300">{o.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
