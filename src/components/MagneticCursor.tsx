"use client";

import { useEffect, useRef } from "react";

export function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const isFinePointer =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(pointer: fine)").matches;

    if (!isFinePointer) return;

    document.documentElement.classList.add("cursorHidden");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const loop = () => {
      rx += (x - rx) * 0.14;
      ry += (y - ry) * 0.14;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const el = t?.closest?.("[data-magnetic]") as HTMLElement | null;
      if (!el) return;

      ring.style.width = "56px";
      ring.style.height = "56px";
      ring.style.borderColor = "rgba(200,162,74,0.55)";
    };

    const onOut = () => {
      ring.style.width = "42px";
      ring.style.height = "42px";
      ring.style.borderColor = "rgba(255,255,255,0.18)";
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    loop();

    return () => {
      document.documentElement.classList.remove("cursorHidden");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-[42px] w-[42px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{
          borderColor: "rgba(255,255,255,0.18)",
          boxShadow: "0 0 30px rgba(200,162,74,0.10)",
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[91] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "rgba(200,162,74,0.95)" }}
      />
    </>
  );
}
