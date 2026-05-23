"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface ProjectNarrativeScrollProps {
  problem?: string;
  whyItMatters?: string;
  theIdea?: string;
}

type NarrativeState = "problem" | "why" | "idea";

export default function ProjectNarrativeScroll({
  problem = "Emerging artists struggle to sell without gallery backing, while buyers hesitate to purchase art they can't visualise in their own space.",
  whyItMatters = "Art is expensive and personal. Without scale or context, buyers delay decisions and promising artists lose momentum before buyers commit.",
  theIdea = "ReCanvased uses AR to let buyers preview artwork in their own homes, reducing uncertainty and increasing confidence before purchase.",
}: ProjectNarrativeScrollProps) {
  const [activeState, setActiveState] = useState<NarrativeState>("problem");
  const stepRefs = useRef<Record<NarrativeState, HTMLDivElement | null>>({
    problem: null,
    why: null,
    idea: null,
  });

  const steps = useMemo(
    () => [
      {
        id: "problem" as const,
        eyebrow: "01",
        title: "The problem",
        text: problem,
      },
      {
        id: "why" as const,
        eyebrow: "02",
        title: "Why it matters",
        text: whyItMatters,
      },
      {
        id: "idea" as const,
        eyebrow: "03",
        title: "The idea",
        text: theIdea,
      },
    ],
    [problem, whyItMatters, theIdea]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const nextEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!nextEntry) {
          return;
        }

        const nextId = nextEntry.target.getAttribute(
          "data-narrative-id"
        ) as NarrativeState | null;

        if (nextId) {
          setActiveState((currentState) =>
            currentState === nextId ? currentState : nextId
          );
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -20% 0px",
        threshold: [0.2, 0.4, 0.6, 0.8],
      }
    );

    const elements = steps
      .map((step) => stepRefs.current[step.id])
      .filter((element): element is HTMLDivElement => Boolean(element));

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [steps]);

  const currentContent =
    steps.find((step) => step.id === activeState) ?? steps[0];

  return (
    <section className="w-full px-6 py-16 md:px-12 md:py-24">
      <div className="site-container">
        <div className="space-y-10 md:hidden">
          {steps.map((step) => (
            <div
              key={step.id}
              className="rounded-[28px] bg-section px-6 py-8 text-center"
            >
              <p className="mb-4 font-manrope text-sm uppercase tracking-[0.24em] text-text/60">
                {step.eyebrow}
              </p>
              <h3 className="mb-4 font-bricolage text-[28px] font-bold text-text">
                {step.title}
              </h3>
              <p className="mx-auto max-w-2xl font-manrope text-base leading-relaxed text-text">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        <div className="hidden md:block">
          <div className="md:sticky md:top-28 md:flex md:h-[calc(100vh-8rem)] md:items-center md:justify-center">
            <div
              key={currentContent.id}
              className="w-full max-w-4xl rounded-[36px] bg-section px-8 py-10 text-center shadow-sm transition-all duration-300 lg:px-12 lg:py-14"
            >
              <p className="mb-5 font-manrope text-sm uppercase tracking-[0.28em] text-text/60">
                {currentContent.eyebrow}
              </p>
              <h3 className="mb-6 font-bricolage text-[32px] font-bold text-text lg:text-[40px] xl:text-[44px]">
                {currentContent.title}
              </h3>
              <p className="mx-auto max-w-2xl font-manrope text-lg leading-relaxed text-text lg:text-xl xl:text-2xl">
                {currentContent.text}
              </p>
              <div className="mt-8 flex justify-center gap-3">
                {steps.map((step) => {
                  const isActive = activeState === step.id;

                  return (
                    <span
                      key={step.id}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        isActive ? "w-10 bg-text" : "w-2.5 bg-text/25"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div aria-hidden="true">
            {steps.map((step) => (
              <div
                key={step.id}
                ref={(element) => {
                  stepRefs.current[step.id] = element;
                }}
                data-narrative-id={step.id}
                className="min-h-[65vh]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
