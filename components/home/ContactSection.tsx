"use client";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-section-bg py-20 md:py-28 lg:py-32"
    >
      <div className="home-wide-container">
        <div className="max-w-5xl space-y-8 md:space-y-10 2xl:max-w-6xl">
          <p className="font-bricolage text-lg text-text/60 md:text-xl">
            Get in touch
          </p>
          <div className="max-w-4xl space-y-6">
            <h2 className="font-bricolage text-[34px] font-medium leading-[1.05] tracking-[-0.03em] text-text md:text-[52px] lg:text-[72px]">
              If you&apos;d like to work together, I&apos;d love to hear from you.
            </h2>
            <p className="max-w-2xl font-manrope text-lg leading-[1.55] text-text/80 md:text-xl">
              I&apos;m currently looking for digital design opportunities across web, brand, motion, and creative technology in London.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 pt-2 md:flex-row md:flex-wrap md:gap-4">
            <a
              href="mailto:cummingfin@gmail.com"
              className="rounded-full border border-text/12 bg-background px-5 py-3 font-manrope text-base text-text transition-all hover:-translate-y-0.5 hover:border-text/25 hover:bg-white focus:outline-none focus:ring-2 focus:ring-text/25"
              aria-label="Send email to cummingfin@gmail.com"
            >
              cummingfin@gmail.com
            </a>
            <a
              href="tel:07710698974"
              className="rounded-full border border-text/12 bg-background px-5 py-3 font-manrope text-base text-text transition-all hover:-translate-y-0.5 hover:border-text/25 hover:bg-white focus:outline-none focus:ring-2 focus:ring-text/25"
              aria-label="Call 07710698974"
            >
              07710 698974
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
