"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Preloader() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const bar = barRef.current;
    if (!wrap || !bar) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
      },
    });

    tl.set(wrap, { autoAlpha: 1 })
      .fromTo(
        bar,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.0, ease: "power2.out" }
      )
      .to(wrap, { autoAlpha: 0, duration: 0.55, ease: "power2.out" }, "+=0.12");

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
      style={{ opacity: 0 }}
    >
      <div className="w-full max-w-md px-6">
        <div className="flex items-center justify-center">
          <img src="/logo.svg" alt="Sovereign" className="h-12 w-12" />
        </div>
        <div className="mt-5 text-center text-xs font-semibold tracking-[0.28em] text-gold">
          AI everywhere. Automation everywhere.
        </div>

        <div className="mt-6 rounded-full border border-line bg-panel/40 p-1">
          <div
            ref={barRef}
            className="h-2 origin-left rounded-full bg-gradient-to-r from-gold to-platinum"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <div className="mt-4 text-center text-xs text-muted">
          Projects from 100,000 AED+
        </div>
      </div>
    </div>
  );
}
