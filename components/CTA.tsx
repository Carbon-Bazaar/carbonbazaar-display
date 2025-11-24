'use client';

import { Linkedin } from 'lucide-react';

export default function CTA() {
  return (
    <section id="contact" className="section-padding bg-gray-50 dark:bg-gray-800 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-playfair">
          Ready to be part of a cleaner, fairer carbon economy?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
          Join thousands of communities and businesses making a difference
        </p>
        <a
          href="https://www.linkedin.com/company/carbon-bazaar/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center btn-primary text-lg px-10 py-4"
        >
          <Linkedin className="w-6 h-6 mr-3" />
          Contact Us
        </a>
      </div>
    </section>
  );
}
