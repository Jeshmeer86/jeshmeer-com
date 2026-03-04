import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl",
        "p-6 md:p-7",
        "glass borderGlow",
        "shadow-[0_22px_70px_-38px_rgba(0,0,0,0.85)]",
        "transition-transform duration-300 will-change-transform",
        "hover:-translate-y-[1px]",
        "before:pointer-events-none before:absolute before:inset-0",
        "before:opacity-0 before:transition-opacity before:duration-300",
        "before:bg-[radial-gradient(700px_circle_at_15%_0%,rgba(255,255,255,0.12),transparent_45%),radial-gradient(700px_circle_at_90%_100%,rgba(255,215,0,0.10),transparent_48%)]",
        "hover:before:opacity-100",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
