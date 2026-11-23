import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EMAIL, FIRST, GITHUB, INTERESTS, KEYWORDS, LANGUAGES, LINKEDIN, NAV, PROJECTS, ROADMAP, go } from "./data";
import { Reveal, SectionHeading, Sparkle, Squiggle, StatusTag } from "./primitives";
import { DragSelect } from "../ui/drag-select";

export function Marquee() {
  const row = [...KEYWORDS, ...KEYWORDS];
  return (
    <DragSelect>
      <div aria-hidden className="relative -my-4 overflow-hidden py-10">
        <div className="relative -mb-3 rotate-[2.5deg] border-y-[1.5px] border-navy bg-sky py-3">
          <div className="flex w-max animate-marquee-reverse gap-8 font-mono text-sm uppercase tracking-[0.25em] text-navy">
            {row.map((k, i) => (
              <span key={i} className="flex items-center gap-8">
                {k}
                <span>✦</span>
              </span>
            ))}
          </div>
        </div>
        <div className="relative rotate-[-2.5deg] border-y-[1.5px] border-navy bg-navy py-4">
          <div className="flex w-max animate-marquee gap-10 font-display text-3xl italic-wonk text-cream sm:text-4xl">
            {row.map((k, i) => (
              <span key={i} className="flex items-center gap-10">
                {k}
                <Sparkle className="h-5 w-5 text-sun" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </DragSelect>
  );
}

function Meter({ level }: { level: number }) {
  return (
    <span className="flex gap-1" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className={cn("h-1.5 w-4 rounded-full", i < level ? "bg-navy" : "bg-navy/15")} />
      ))}
    </span>
  );
}

export function About() {
  return (
    <DragSelect>
      <section id="intro" className="relative mx-auto max-w-6xl px-6 py-28">
        <SectionHeading n="01" kicker="Intro">
          A little <span className="italic-wonk text-navy-soft">about</span> me
        </SectionHeading>

        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr]">
          <Reveal className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p className="font-display text-3xl font-light leading-[1.2] text-navy sm:text-4xl">
              I’m a first-year B.Tech <span className="marker">Computer Science</span> student at Anurag University who
              loves discovering new ideas and getting a little better every day.
            </p>
            <p>
              I’m building my foundation in programming with <strong className="font-semibold text-navy">C, C++ and Java</strong>,
              and growing an interest in Data Structures and Algorithms, software development and app development.
            </p>
            <p>Beyond academics, I’m into technology, creativity, problem-solving and exploring new opportunities.</p>
            <div className="relative w-fit pt-4">
              <p className="font-hand text-4xl text-navy">Every expert was once a beginner.</p>
              <Squiggle className="mt-1 text-sun" />
            </div>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.1}>
              <div className="pop-card p-7">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-2xl font-medium">Languages</h3>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">in progress</span>
                </div>
                <ul className="divide-y divide-navy/10">
                  {LANGUAGES.map((l) => (
                    <li key={l.name} className="flex items-center justify-between gap-4 py-3.5">
                      <span className="font-display text-2xl italic-wonk">{l.name}</span>
                      <span className="flex items-center gap-4">
                        <Meter level={l.level} />
                        <StatusTag status={l.status} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="pop-card bg-cream-deep p-7">
                <h3 className="mb-5 text-2xl font-medium">Interests</h3>
                <div className="flex flex-wrap gap-2.5">
                  {INTERESTS.map((it) => (
                    <motion.span
                      key={it.name}
                      whileHover={{ rotate: -3, y: -2 }}
                      className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-navy bg-paper py-1.5 pl-4 pr-1.5 text-sm font-medium"
                    >
                      {it.name}
                      <StatusTag status={it.status} />
                    </motion.span>
                  ))}
                </div>
                <p className="mt-6 text-sm text-muted-foreground">These are developing interests, not professional services.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </DragSelect>
  );
}

export function Study() {
  return (
    <DragSelect>
      <section id="study" className="grain relative overflow-hidden rounded-[2.5rem] bg-navy px-6 py-28 text-cream sm:mx-4 sm:rounded-[3.5rem]">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-navy-soft/50 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-full pattern-grid text-cream [mask-image:linear-gradient(to_top,black,transparent)]" />
          <Sparkle className="absolute left-[8%] top-24 h-5 w-5 animate-twinkle text-sun" />
          <Sparkle className="absolute right-[14%] top-[45%] h-3 w-3 animate-twinkle text-cream [animation-delay:1s]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <SectionHeading n="02" kicker="Study" tone="dark">
            Where I <span className="italic-wonk text-sky">study</span>
          </SectionHeading>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <div className="h-full rounded-[2rem] border-[1.5px] border-cream/25 bg-navy-deep/60 p-8 backdrop-blur-sm sm:p-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-navy">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy" /> Currently · First year
                </span>
                <h3 className="mt-6 text-4xl font-normal leading-tight sm:text-5xl">
                  Bachelor of <span className="italic-wonk">Technology</span>
                </h3>
                <p className="mt-3 text-lg text-cream/75">Computer Science and Engineering</p>
                <p className="font-hand text-3xl text-sky">Anurag University</p>

                <div className="mt-12">
                  <div className="mb-3 flex justify-between font-mono text-xs uppercase tracking-[0.2em] text-cream/60">
                    <span>2026</span>
                    <span>Graduation · 2030</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {["Year 1", "Year 2", "Year 3", "Year 4"].map((y, i) => (
                      <div key={y}>
                        <div className="relative h-2.5 overflow-hidden rounded-full bg-cream/15">
                          {i === 0 && (
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: "100%" }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                              className="h-full rounded-full bg-sun"
                            />
                          )}
                        </div>
                        <p className={cn("mt-2 text-xs", i === 0 ? "text-cream" : "text-cream/50")}>{y}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 font-hand text-2xl text-cream/80">↑ you are here</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-[2rem] bg-cream p-8 text-navy sm:p-10">
                <p className="mb-8 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">My learning path</p>
                <ol className="relative space-y-8">
                  <span aria-hidden className="absolute bottom-4 left-[19px] top-4 w-px border-l-[1.5px] border-dashed border-navy/30" />
                  {ROADMAP.map((r, i) => (
                    <li key={r.title} className="relative flex gap-5">
                      <span
                        className={cn(
                          "relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-[1.5px] border-navy font-mono text-xs",
                          i === 0 ? "bg-navy text-cream" : "bg-paper",
                        )}
                      >
                        0{i + 1}
                      </span>
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-navy-soft">{r.when}</p>
                        <p className="mt-1 font-display text-2xl leading-tight">{r.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </DragSelect>
  );
}

export function Projects() {
  return (
    <DragSelect>
      <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28">
        <SectionHeading n="03" kicker="Projects">
          Things I’m <span className="italic-wonk text-navy-soft">building</span>
        </SectionHeading>
        <Reveal>
          <p className="-mt-8 mb-12 max-w-md text-muted-foreground">
            Currently exploring and upcoming. Nothing here is finished yet — that’s the fun part.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article className="pop-card group flex h-full flex-col overflow-hidden p-3">
                <div className="relative grid h-48 place-items-center overflow-hidden rounded-[1.25rem] bg-navy text-cream">
                  <div aria-hidden className={cn("absolute inset-0 text-cream", p.pattern)} />
                  <p
                    aria-hidden
                    className="absolute -bottom-6 -right-2 font-display text-[7rem] font-light italic-wonk leading-none text-cream/15 transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[-6deg]"
                  >
                    {p.tech}
                  </p>
                  <div className="relative grid h-16 w-16 place-items-center rounded-full border-[1.5px] border-cream bg-navy transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                    <p.Icon className="h-7 w-7" strokeWidth={1.5} aria-hidden />
                  </div>
                  <StatusTag status={p.status} className="absolute left-3 top-3 bg-cream text-navy" />
                </div>
                <div className="flex flex-1 flex-col px-3 pb-3 pt-6">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-navy-soft">{p.tech}</p>
                  <h3 className="mt-1 text-2xl font-medium">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                  <a
                    href={GITHUB}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex w-fit items-center gap-1.5 border-b-[1.5px] border-navy pb-0.5 text-sm font-semibold"
                  >
                    GitHub (placeholder)
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="relative mx-auto mt-28 max-w-3xl text-center">
          <Sparkle className="absolute -left-2 -top-6 h-8 w-8 animate-twinkle text-sun sm:-left-10" />
          <Sparkle className="absolute -right-2 bottom-0 h-5 w-5 animate-twinkle text-navy [animation-delay:1.2s] sm:-right-8" />
          <p className="font-display text-4xl font-light leading-[1.15] sm:text-5xl">
            Every great discovery begins with <span className="italic-wonk marker-sun">curiosity</span>. My journey is just
            getting started.
          </p>
        </Reveal>
      </section>
    </DragSelect>
  );
}

export function Contact() {
  const [msg, setMsg] = useState("");
  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const message = String(f.get("message") ?? "").trim();
    if (!name || !message) return setMsg("Please add your name and a message.");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Message from " + name)}&body=${encodeURIComponent(
      message + (email ? `\n\n— ${email}` : ""),
    )}`;
    setMsg("Opening your email app…");
  };

  const links = [
    { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, Icon: Mail },
    { label: "LinkedIn", value: "Connect on LinkedIn", href: "https://linkedin.com/in/harshitha-tangallapelli-299610450", Icon: Linkedin },
    { label: "GitHub", value: "View GitHub projects", href: "https://github.com/Harshitha-tpally", Icon: Github },
  ];

  return (
    <DragSelect>
      <section id="contact" className="px-3 pb-10 pt-10 sm:px-4">
        <div className="grain relative mx-auto max-w-[88rem] overflow-hidden rounded-[2.5rem] bg-navy px-6 py-20 text-cream sm:rounded-[3.5rem] sm:px-12 sm:py-24">
          <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-navy-soft/60 blur-3xl" />
            <Sparkle className="absolute right-[10%] top-16 h-6 w-6 animate-twinkle text-sun" />
          </div>
          <div className="relative z-10 mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <SectionHeading n="04" kicker="Contact" tone="dark" className="mb-8">
                Have an idea?
                <br />
                Let’s <span className="italic-wonk text-sky">connect.</span>
              </SectionHeading>
              <Reveal>
                <p className="mb-10 max-w-md text-lg text-cream/75">
                  I’m always excited to meet people, exchange ideas, learn new things and explore opportunities in technology.
                </p>
                <ul className="divide-y divide-cream/15 border-y border-cream/15">
                  {links.map(({ label, value, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={label === "Email" ? undefined : "_blank"}
                        rel="noreferrer"
                        className="group flex items-center justify-between gap-4 py-5"
                      >
                        <span className="flex items-center gap-4">
                          <span className="grid h-11 w-11 place-items-center rounded-full border-[1.5px] border-cream/40 transition-colors group-hover:bg-cream group-hover:text-navy">
                            <Icon className="h-4 w-4" aria-hidden />
                          </span>
                          <span>
                            <span className="block font-display text-2xl">{label}</span>
                            <span className="text-sm text-cream/60">{value}</span>
                          </span>
                        </span>
                        <ArrowUpRight
                          className="h-5 w-5 text-cream/60 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cream"
                          aria-hidden
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <form onSubmit={send} className="relative rounded-[2rem] bg-cream p-7 text-navy shadow-pop-cream sm:p-9">
                <p className="mb-6 font-hand text-3xl">drop me a note ✎</p>
                <div className="space-y-5">
                  <label className="block text-sm font-semibold">
                    Name
                    <input name="name" autoComplete="name" placeholder="Your name" className="field mt-2" />
                  </label>
                  <label className="block text-sm font-semibold">
                    Email
                    <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className="field mt-2" />
                  </label>
                  <label className="block text-sm font-semibold">
                    Message
                    <textarea name="message" rows={4} placeholder="Say hi, share an idea…" className="field mt-2 resize-none" />
                  </label>
                </div>
                <Button type="submit" variant="navy" size="pill" className="group mt-7 w-full sm:w-auto">
                  Send message
                  <Send className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" aria-hidden />
                </Button>
                <p role="status" className="mt-3 min-h-5 text-sm text-navy-soft">
                  {msg}
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </DragSelect>
  );
}

export function Footer() {
  return (
    <DragSelect>
      <footer className="relative overflow-hidden px-6 pb-10 pt-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="font-hand text-3xl text-navy">Designed with curiosity, built with passion.</p>
            <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
              {NAV.map((n) => (
                <button key={n.id} onClick={() => go(n.id)} className="text-navy/70 transition-colors hover:text-navy">
                  {n.label}
                </button>
              ))}
            </nav>
          </div>
          <p
            aria-hidden
            className="mt-10 select-none text-center font-display text-[22vw] font-normal italic-wonk leading-[0.8] tracking-tighter text-navy/90 lg:text-[16rem]"
          >
            {FIRST.toLowerCase()}
            <span className="text-sun">.</span>
          </p>
          <div className="mt-8 flex flex-col justify-between gap-2 border-t-[1.5px] border-navy/15 pt-6 pr-16 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground sm:flex-row">
            <span>© 2026 Harshitha Tangallapelli</span>
            <span>All rights reserved</span>
          </div>
        </div>
      </footer>
    </DragSelect>
  );
}
