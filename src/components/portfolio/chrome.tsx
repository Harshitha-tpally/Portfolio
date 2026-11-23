import { useEffect, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring } from "motion/react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAME, NAV, go } from "./data";
import { Sparkle } from "./primitives";

/* Intro curtain: a quick count-up, then it lifts away */
export function Loader({ onDone, reduced }: { onDone: () => void; reduced: boolean | null }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const dur = reduced ? 300 : 1500;
    const start = performance.now();
    let raf = 0;
    let t = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setN(Math.round((1 - (1 - p) ** 3) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else t = window.setTimeout(onDone, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [onDone, reduced]);

  return (
    <motion.div
      exit={{ y: "-100%", borderBottomLeftRadius: "50% 20%", borderBottomRightRadius: "50% 20%" }}
      transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
      role="status"
      aria-label="Loading"
      className="grain fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-navy p-6 text-cream sm:p-10"
    >
      <div className="relative z-10 flex items-center justify-between font-mono text-xs uppercase tracking-[0.28em] text-cream/70">
        <span>{NAME}</span>
        <span>Portfolio · ’26</span>
      </div>
      <div className="relative z-10">
        <div className="flex items-end gap-4">
          <p className="font-display text-[30vw] font-light leading-[0.8] tracking-tighter sm:text-[20vw]">
            <span className="italic-wonk">{n}</span>
          </p>
          <Sparkle className="mb-[3vw] h-10 w-10 animate-twinkle text-sun sm:h-16 sm:w-16" />
        </div>
        <div className="mt-6 h-[3px] w-full overflow-hidden rounded-full bg-cream/15">
          <div className="h-full rounded-full bg-cream" style={{ width: `${n}%` }} />
        </div>
      </div>
      <p className="relative z-10 font-hand text-2xl text-cream/80">warming up the universe…</p>
    </motion.div>
  );
}

export function Nav() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
      className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-3"
    >
      <nav
        aria-label="Main"
        className="pointer-events-auto flex items-center gap-1 rounded-full border-[1.5px] border-navy bg-paper/85 p-1.5 shadow-pop-sm backdrop-blur-md"
      >
        <button
          onClick={() => go("home")}
          aria-label="Back to top"
          className="mr-1 hidden h-9 w-9 place-items-center rounded-full bg-navy font-display text-lg italic-wonk text-cream sm:grid"
        >
          h
        </button>
        {NAV.map((n) => (
          <button
            key={n.id}
            onClick={() => go(n.id)}
            aria-current={active === n.id ? "page" : undefined}
            className={cn(
              "relative rounded-full px-3 py-2 text-[13px] font-medium transition-colors sm:px-4 sm:text-sm",
              active === n.id ? "text-cream" : "text-navy/70 hover:text-navy",
            )}
          >
            {active === n.id && (
              <motion.span
                layoutId="nav-pill"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="absolute inset-0 rounded-full bg-navy"
              />
            )}
            <span className="relative">{n.label}</span>
          </button>
        ))}
      </nav>
    </motion.header>
  );
}

export function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-navy" />;
}

/* Soft ring that trails the pointer (desktop only, native cursor stays) */
export function CursorRing() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [on, setOn] = useState(false);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOn(true);
    const mv = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHover(!!t.closest?.("a,button,[role=button],input,textarea"));
    };
    window.addEventListener("pointermove", mv);
    return () => window.removeEventListener("pointermove", mv);
  }, [x, y]);
  if (!on) return null;
  return (
    <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[200]">
      <motion.div
        animate={{ scale: hover ? 1.7 : 1, opacity: hover ? 0.9 : 0.6 }}
        transition={{ type: "spring", stiffness: 400, damping: 26 }}
        className="-ml-4 -mt-4 h-8 w-8 rounded-full border-[1.5px] border-navy shadow-[0_0_0_1.5px_var(--cream)]"
      />
    </motion.div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 700);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <Button
      variant="navy"
      size="round"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={cn("fixed bottom-5 right-5 z-50", show ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0")}
    >
      <ArrowUp aria-hidden />
    </Button>
  );
}
