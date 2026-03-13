import Link from "next/link";
export default function HeroSection() {
  return (
    <section className="relative py-24 md:py-32 text-center bg-gradient-to-b from-black via-zinc-900 to-black">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
          Controlled deal workflows for luxury dealerships
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 mb-10">
          Manage reservations, deposits, documents, approvals, and evidence
          exports in one accountable system.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/dashboard/deals"
            className="px-8 py-3 rounded-lg bg-white text-black font-semibold shadow-lg hover:bg-zinc-200 transition"
          >
            View live demo
          </Link>
          <a
            href="#cta"
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-semibold shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition"
          >
            Request private walkthrough
          </a>
        </div>
      </div>
    </section>
  );
}
