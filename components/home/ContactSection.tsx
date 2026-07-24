"use client";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-[#272523] py-20 text-[#eee8de] md:py-28 lg:py-32"
    >
      <div className="home-wide-container">
        <div className="border-t border-[#eee8de]/25 pt-7">
          <p className="font-manrope text-sm font-semibold text-[#eee8de]/58 md:text-base">
            Available for digital design roles in London
          </p>
          <div className="mt-12 max-w-6xl md:mt-16">
            <h2 className="font-manrope text-[clamp(42px,6.5vw,100px)] font-medium leading-[1.04] tracking-[-0.055em] text-[#eee8de]">
              Have a role or project in mind? Let&apos;s talk.
            </h2>
          </div>
          <div className="mt-14 flex flex-col items-start gap-5 border-t border-[#eee8de]/25 pt-6 md:mt-20 md:flex-row md:items-center md:justify-between">
            <a
              href="mailto:cummingfin@gmail.com"
              className="font-manrope text-xl text-[#eee8de] underline decoration-[#eee8de]/35 underline-offset-8 transition-opacity hover:opacity-65 focus:outline-none focus:ring-2 focus:ring-[#eee8de]/40 md:text-2xl"
              aria-label="Send email to cummingfin@gmail.com"
            >
              cummingfin@gmail.com
            </a>
            <div className="flex items-center gap-6 font-manrope text-sm text-[#eee8de]/65 md:text-base">
              <a href="tel:07710698974" className="transition-opacity hover:opacity-65">
                07710 698974
              </a>
              <a
                href="/Files/Findlay%20Cumming%20-%20Digital%20Designer%20CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-65"
              >
                View CV ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
