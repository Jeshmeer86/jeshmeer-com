"use client";

import { useEffect, useRef } from "react";

type Spark = {
  x: number;
  y: number;
  r: number;
  a: number;
  s: number;
  p: number;
};

export function SparkleField({ density = 44 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { w, h };
    };

    let size = resize();
    if (!size) return;

    const sparks: Spark[] = [];
    for (let i = 0; i < density; i++) {
      sparks.push({
        x: Math.random() * size.w,
        y: Math.random() * size.h,
        r: 0.6 + Math.random() * 1.8,
        a: 0.15 + Math.random() * 0.45,
        s: 0.2 + Math.random() * 0.6,
        p: Math.random() * Math.PI * 2,
      });
    }

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, size!.w, size!.h);

      for (const sp of sparks) {
        sp.p += 0.02 * sp.s;
        const tw = 0.55 + 0.45 * Math.sin(sp.p);
        const alpha = sp.a * tw;

        // tiny drift
        sp.y += 0.05 * sp.s;
        if (sp.y > size!.h + 10) sp.y = -10;

        // sparkle draw
        ctx.beginPath();
        ctx.fillStyle = `rgba(200,162,74,${alpha})`;
        ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
        ctx.fill();

        // cross flare
        ctx.strokeStyle = `rgba(215,222,230,${alpha * 0.55})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(sp.x - 6, sp.y);
        ctx.lineTo(sp.x + 6, sp.y);
        ctx.moveTo(sp.x, sp.y - 6);
        ctx.lineTo(sp.x, sp.y + 6);
        ctx.stroke();
      }
    };

    tick();

    const onResize = () => {
      size = resize();
    };

    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    />
  );
}
