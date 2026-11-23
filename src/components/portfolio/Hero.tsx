import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { MouseEvent } from "react";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FIRST, LAST, NAME, PHOTO, go } from "./data";
import { CircleText, Reveal, Sparkle, Squiggle, ease } from "./primitives";
import { DragSelect } from "@/components/ui/drag-select";

function Letters({ text, ready, delay = 0, className }: { text: string; ready: boolean; delay?: number; className?: string }) {
  return (
    <span className={className} aria-hidden>
      {text.split("").map((ch, i) => (
        <span key={i} className="-mx-[0.08em] -mb-[0.18em] inline-block overflow-hidden px-[0.08em] pb-[0.18em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotate: 8 }}
            animate={ready ? { y: "0%", rotate: 0 } : { y: "110%", rotate: 8 }}
            transition={{ duration: 0.9, delay: delay + i * 0.035, ease }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function ArchPortrait() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 150, damping: 18 });
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const leave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <DragSelect>
      <div className="relative mx-auto w-full max-w-[380px] [perspective:1000px]" onMouseMove={move} onMouseLeave={leave}>
        <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative [transform-style:preserve-3d]">
          {/* Arch */}
          <div className="grain relative aspect-[4/5] overflow-hidden rounded-t-[12rem] rounded-b-[2rem] border-[1.5px] border-navy bg-navy shadow-pop">
            {PHOTO ? (
              <img src={PHOTO} alt={`Portrait of ${NAME}`} className="h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0 text-cream">
                {/* starfield */}
                {[
                  [18, 22, 3],
                  [72, 16, 2],
                  [84, 40, 3],
                  [12, 58, 2],
                  [64, 74, 2],
                  [30, 84, 3],
                  [88, 82, 2],
                  [48, 12, 2],
                ].map(([l, t, s], i) => (
                  <span
                    key={i}
                    className="absolute animate-twinkle rounded-full bg-cream"
                    style={{ left: `${l}%`, top: `${t}%`, width: s, height: s, animationDelay: `${i * 0.4}s` }}
                  />
                ))}
                {/* orbit */}
                <div className="absolute left-1/2 top-[54%] h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/20" />
                <div className="absolute left-1/2 top-[54%] h-[56%] w-[56%] -translate-x-1/2 -translate-y-1/2 animate-orbit rounded-full border border-dashed border-cream/30">
                  <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-sun shadow-[0_0_24px_var(--sun)]" />
                </div>
                <div className="absolute left-1/2 top-[54%] h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 animate-[spin_26s_linear_infinite_reverse]">
                  <span className="absolute bottom-[6%] right-[12%] h-2.5 w-2.5 rounded-full bg-sky" />
                </div>
                {/* monogram */}
                <div className="absolute inset-0 grid place-items-center [transform:translateZ(40px)]">
                  <p className="mt-10 font-display text-[9rem] font-light italic-wonk leading-none">
                    H<span className="-ml-3 text-sky">t</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sticker: year */}
          <div
            className="absolute -right-3 top-[18%] animate-float rounded-full border-[1.5px] border-navy bg-sun px-4 py-2 font-mono text-xs uppercase tracking-wider text-navy-deep shadow-pop-sm [--r:8deg] sm:-right-8"
            style={{ transform: "translateZ(60px)" }}
          >
            1st year ✦
          </div>

          {/* Circular badge */}
          <div className="absolute -bottom-10 -left-6 h-32 w-32 rounded-full border-[1.5px] border-navy bg-paper text-navy shadow-pop-sm sm:-left-12 sm:h-36 sm:w-36">
            <CircleText text="Class of 2030 ✦ B.Tech CSE ✦ " className="h-full w-full">
              <Sparkle className="h-8 w-8 text-navy" />
            </CircleText>
          </div>

          {/* Hand note */}
          <div className="absolute -right-2 -bottom-14 hidden rotate-[-6deg] items-center gap-1 font-hand text-2xl text-navy sm:flex">
            <svg viewBox="0 0 60 40" className="h-8 w-12 -scale-x-100" fill="none" aria-hidden>
              <path d="M4 34 C 18 30, 34 20, 48 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M38 6 L 49 5 L 47 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            that’s me!
          </div>
        </motion.div>
      </div>
    </DragSelect>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  return (
    <DragSelect>
      <section id="home" className="relative overflow-hidden px-6 pb-28 pt-32 sm:pt-40">
        {/* backdrop */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-sky/40 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-cream-deep blur-3xl" />
          <div className="absolute right-0 top-24 h-72 w-1/2 pattern-dots text-navy [mask-image:radial-gradient(closest-side,black,transparent)]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-20 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, ease }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border-[1.5px] border-navy bg-paper px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sun" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sun" />
              </span>
              Learning · Building · Exploring
            </motion.span>

            <motion.p
              initial={{ opacity: 0, rotate: -6, x: -10 }}
              animate={ready ? { opacity: 1, rotate: -3, x: 0 } : { opacity: 0, rotate: -6, x: -10 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="mb-2 w-fit font-hand text-3xl text-navy-soft sm:text-4xl"
            >
              hello there, I’m —
            </motion.p>

            <h1 aria-label={NAME} className="font-display text-navy">
              <Letters
                text={FIRST}
                ready={ready}
                delay={0.2}
                className="block text-[clamp(3.6rem,11vw,8.5rem)] font-normal leading-[0.92] tracking-[-0.04em]"
              />
              <Letters
                text={LAST}
                ready={ready}
                delay={0.45}
                className="block text-[clamp(2.4rem,7.4vw,5.6rem)] font-light italic-wonk leading-[0.95] tracking-[-0.03em] text-navy-soft"
              />
            </h1>

            <Reveal delay={0.2} className="mt-8 max-w-lg">
              <p className="text-xl leading-snug text-navy sm:text-2xl">
                Exploring the universe of technology, <span className="marker">one line of code</span> at a time.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                First-year Computer Science and Engineering student, passionate about technology, creativity and
                continuous learning.
              </p>
            </Reveal>

            <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center gap-3">
              <Button variant="navy" size="pill" onClick={() => go("intro")} className="group">
                Explore my universe
                <ArrowDownRight className="transition-transform duration-300 group-hover:rotate-[-45deg]" aria-hidden />
              </Button>
              <Button variant="cream" size="pill" onClick={() => go("contact")} className="group">
                Connect with me
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Button>
            </Reveal>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 4 }}
            animate={ready ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: 40, rotate: 4 }}
            transition={{ duration: 1, delay: 0.35, ease }}
          >
            <ArchPortrait />
          </motion.div>
        </div>

        {/* Stats */}
        <Reveal className="relative mx-auto mt-28 grid max-w-6xl grid-cols-3 divide-x-[1.5px] divide-navy/15 border-y-[1.5px] border-navy/15">
          {[
            ["1st", "Year of B.Tech"],
            ["3", "Languages in progress"],
            ["2030", "Expected graduation"],
          ].map(([n, l]) => (
            <div key={l} className="group px-3 py-6 text-center sm:px-6 sm:py-8">
              <p className="font-display text-4xl font-normal italic-wonk transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110 sm:text-6xl">
                {n}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">{l}</p>
            </div>
          ))}
        </Reveal>
        <div className="relative mx-auto mt-3 w-40 text-navy/30">
          <Squiggle />
        </div>
      </section>
    </DragSelect>
  );
}
