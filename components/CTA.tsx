'use client';

import { ArrowRight, Mail } from 'lucide-react';

export default function CTA() {
  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--warm-white)' }}
    >
      {/* Subtle decorative mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 30% 50%, rgba(149, 213, 178, 0.12) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 70% 50%, rgba(45, 106, 79, 0.06) 0%, transparent 60%)',
        }}
      />

      <div className="section-container relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--sage)' }}
          >
            Get Started
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-playfair leading-tight"
            style={{ color: 'var(--forest)' }}
          >
            Ready to Join the
            <br />
            Carbon Revolution?
          </h2>
          <p
            className="text-lg mb-10 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Whether you're a community restoring ecosystems or a business looking to
            offset emissions — we'd love to hear from you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://www.linkedin.com/company/carbon-bazaar/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span className="flex items-center gap-2">
                Connect on LinkedIn
                <ArrowRight className="w-5 h-5" />
              </span>
            </a>
            <a
              href="mailto:contact@carbonbazaar.shop"
              className="btn-ghost flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
