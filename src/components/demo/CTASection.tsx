export default function CTASection() {
  return (
    <section
      id="cta"
      className="py-20 bg-gradient-to-b from-zinc-950 to-black border-t border-zinc-800"
    >
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-400">
          Ready to see Sovereign Deal Control in action?
        </h2>
        <p className="text-lg text-zinc-300 mb-8">
          Request a private walkthrough and discover how we can help your
          dealership control every deal with confidence.
        </p>
        <a
          href="mailto:hello@sovereign.software?subject=Request%20Walkthrough%20-%20Sovereign%20Deal%20Control"
          className="inline-block px-10 py-4 rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-semibold text-lg shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition"
        >
          Request a walkthrough
        </a>
      </div>
    </section>
  );
}
