import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const ease = [0.2, 0.8, 0.2, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Four-point sparkle */
export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("h-6 w-6", className)} fill="currentColor">
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

/* Hand-drawn squiggle underline */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 16" aria-hidden className={cn("h-3 w-full", className)} fill="none" preserveAspectRatio="none">
      <motion.path
        d="M2 10 C 20 2, 35 2, 50 9 S 80 16, 100 8 S 135 1, 150 9 S 182 15, 198 6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
      />
    </svg>
  );
}

/* Rotating circular text badge */
export function CircleText({ text, className, children }: { text: string; className?: string; children?: ReactNode }) {
  return (
    <div className={cn("relative grid place-items-center", className)}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden>
        <defs>
          <path id="circle-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-current font-mono text-[15px] uppercase tracking-[0.32em]">
          <textPath href="#circle-path">{text}</textPath>
        </text>
      </svg>
      {children}
    </div>
  );
}

export function SectionHeading({
  n,
  kicker,
  children,
  tone = "light",
  className,
}: {
  n: string;
  kicker: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <Reveal className={cn("mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between", className)}>
      <div>
        <p
          className={cn(
            "mb-4 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em]",
            dark ? "text-cream/70" : "text-navy-soft",
          )}
        >
          <span
            className={cn(
              "grid h-8 w-8 place-items-center rounded-full border-[1.5px] text-[11px] tracking-normal",
              dark ? "border-cream/60" : "border-navy",
            )}
          >
            {n}
          </span>
          {kicker}
        </p>
        <h2 className={cn("text-5xl font-medium leading-[0.95] sm:text-7xl", dark ? "text-cream" : "text-navy")}>
          {children}
        </h2>
      </div>
    </Reveal>
  );
}

const tones: Record<string, string> = {
  Learning: "bg-navy text-cream",
  Beginner: "bg-sun/80 text-navy-deep",
  Exploring: "bg-sky text-navy-deep",
  Planning: "bg-cream-deep text-navy",
};

export function StatusTag({ status, className }: { status: string; className?: string }) {
  return (
    <span className={cn("rounded-full px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider", tones[status], className)}>
      {status}
    </span>
  );
}
