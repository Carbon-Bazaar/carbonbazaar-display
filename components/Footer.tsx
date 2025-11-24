'use client';

import { Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h3 className="font-playfair text-3xl font-bold text-eco-green dark:text-eco-green-light mb-2">
            CarbonBazaar
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Climate Equity for All</p>

          <div className="flex justify-center gap-8 mb-8 flex-wrap">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-700 dark:text-gray-300 hover:text-eco-green dark:hover:text-eco-green-light transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('mission')}
              className="text-gray-700 dark:text-gray-300 hover:text-eco-green dark:hover:text-eco-green-light transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('impact')}
              className="text-gray-700 dark:text-gray-300 hover:text-eco-green dark:hover:text-eco-green-light transition-colors font-medium"
            >
              Impact
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 dark:text-gray-300 hover:text-eco-green dark:hover:text-eco-green-light transition-colors font-medium"
            >
              Contact
            </button>
          </div>

          <div className="flex justify-center mb-8">
            <a
              href="https://www.linkedin.com/company/carbon-bazaar/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-gradient-to-br from-eco-green to-soft-green flex items-center justify-center text-white hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 py-6">
        <p className="text-center text-gray-600 dark:text-gray-400">
          &copy; {currentYear} CarbonBazaar. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
