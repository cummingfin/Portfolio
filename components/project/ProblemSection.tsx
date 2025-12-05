"use client";

interface ProblemSectionProps {
  problem: string;
}

export default function ProblemSection({ problem }: ProblemSectionProps) {
  return (
    <section className="mb-12 md:mb-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="mb-6 md:mb-8">The problem</h2>
        <p className="text-base md:text-lg leading-relaxed">{problem}</p>
      </div>
    </section>
  );
}


