"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function LiquidGlowSweep({ id }: { id: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      }
    );

    const sweep = el.querySelector("[data-sweep]");
    if (sweep) {
      gsap.fromTo(
        sweep,
        { xPercent: -40, opacity: 0.0 },
        {
          xPercent: 40,
          opacity: 0.35,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={ref} className="relative my-10 overflow-hidden">
      <div
        data-sweep
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(200,162,74,0) 25%, rgba(200,162,74,0.20) 55%, rgba(215,222,230,0) 78%)",
          filter: "blur(10px)",
        }}
      />

      <svg
        className="relative mx-auto block w-full max-w-7xl"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`lg-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(215,222,230,0.00)" />
            <stop offset="0.50" stopColor="rgba(200,162,74,0.48)" />
            <stop offset="1" stopColor="rgba(215,222,230,0.00)" />
          </linearGradient>
          <filter id={`blur-${id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M0,64 C160,96 300,16 480,44 C650,72 720,110 900,84 C1040,64 1100,36 1200,52 L1200,120 L0,120 Z"
          fill={`url(#lg-${id})`}
          filter={`url(#blur-${id})`}
          opacity="0.9"
        />
      </svg>
    </div>
  );
}
