import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { BackToTop, CursorRing, Loader, Nav, ScrollBar } from "@/components/portfolio/chrome";
import { Hero } from "@/components/portfolio/Hero";
import { About, Contact, Footer, Marquee, Projects, Study } from "@/components/portfolio/sections";

const TITLE = "Harshitha Tangallapelli — CSE Student Portfolio";
const DESCRIPTION =
  "Portfolio of Harshitha Tangallapelli, a first-year B.Tech Computer Science and Engineering student at Anurag University exploring C, C++, Java and DSA.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const done = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    document.body.style.overflow = loaded ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  return (
    <>
      <AnimatePresence>{!loaded && <Loader reduced={reduced} onDone={done} />}</AnimatePresence>
      <CursorRing />
      <ScrollBar />
      <Nav />
      <main>
        <Hero ready={loaded} />
        <Marquee />
        <About />
        <Study />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
