const problems = [
  {
    title: "Scattered approvals and missing accountability",
    description:
      "Approvals lost in emails and chats, with no clear audit trail or responsibility.",
  },
  {
    title: "Deposit disputes and unclear timelines",
    description:
      "Untracked deposits and vague deadlines create confusion and risk for all parties.",
  },
  {
    title: "Documents and notes spread across chats and inboxes",
    description:
      "Critical deal information is fragmented, making it hard to find and secure.",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-20 bg-black border-t border-zinc-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-white text-center">
          Dealership pain points
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((p, i) => (
            <div
              key={i}
              className="bg-zinc-900 rounded-xl p-6 shadow-lg border border-zinc-800"
            >
              <h3 className="font-bold text-lg mb-2 text-yellow-400">
                {p.title}
              </h3>
              <p className="text-zinc-300">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
