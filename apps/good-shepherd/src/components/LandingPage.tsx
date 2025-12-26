"use client";

import { useEffect, useRef } from "react";

import { AboutUs } from "./AboutUs";
import { BoardMembers } from "./BoardMembers";
import { Contributions } from "./Contributions";
import { Footer } from "./Footer";
import { FounderDirector } from "./FounderDirector";
import { Gallery } from "./Gallery";
import { Navigation } from "./Navigation";
import { OurStrengths } from "./OurStrengths";
import { Video } from "./Video";
import { VisionMission } from "./VisionMission";
import { Welcome } from "./Welcome";

// Scroll-triggered animation wrapper
function AnimateOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      <Navigation />
      <main className="flex-1">
        {/* Welcome shows immediately - no scroll trigger needed */}
        <Welcome />

        {/* All other sections animate when scrolled into view */}
        <AnimateOnScroll>
          <AboutUs />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <VisionMission />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <FounderDirector />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <BoardMembers />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <Contributions />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <Gallery />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <Video />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <OurStrengths />
        </AnimateOnScroll>
      </main>

      <Footer />
    </div>
  );
}
