"use client";

export default function ContactSection() {
  return (
    <section id="contact" className="px-6 md:px-12 py-20 md:py-32 scroll-mt-24" style={{ backgroundColor: '#E8DDD4' }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="mb-6 md:mb-8 font-bricolage font-bold text-[40px] md:text-[48px]">Get in touch</h2>
        <div className="space-y-4 text-lg md:text-xl font-manrope">
          <p>
            <a 
              href="mailto:cummingfin@gmail.com" 
              className="text-text hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-text focus:ring-offset-2 rounded px-4 py-2 inline-block"
              aria-label="Send email to cummingfin@gmail.com"
            >
              cummingfin@gmail.com
            </a>
          </p>
          <p>
            <a 
              href="tel:07710698974" 
              className="text-text hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-text focus:ring-offset-2 rounded px-4 py-2 inline-block"
              aria-label="Call 07710698974"
            >
              07710698974
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

