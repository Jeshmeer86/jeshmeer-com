"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroBackground } from "@/content/heroBackground";

gsap.registerPlugin(ScrollTrigger);

export function HeroBackdrop() {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    gsap.to(img, {
      y: 70,
      ease: "none",
      scrollTrigger: {
        trigger: img,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const src = heroBackground.sources[heroBackground.choice];

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
      <Image
        ref={imgRef}
        src={src}
        alt="Hero background"
        width={1920}
        height={1080}
        className="h-[120%] w-full object-cover opacity-90"
        style={{ transform: "translateY(0px)" }}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/30 to-transparent" />
      <div
        className="absolute inset-0"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
      />
    </div>
  );
}
