import Link from "next/link";
export default function DemoPreviewSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-zinc-950 border-t border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-white">
          Preview the live deal dashboard
        </h2>
        <Link
          href="/dashboard/deals"
          className="inline-block rounded-2xl overflow-hidden border-4 border-yellow-500/40 shadow-xl hover:shadow-2xl transition"
        >
          <div className="w-full h-64 bg-zinc-900 flex items-center justify-center">
            {/* Replace with real screenshot or dashboard preview in future */}
            <span className="text-zinc-500 text-lg">
              [Live dashboard preview coming soon]
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
