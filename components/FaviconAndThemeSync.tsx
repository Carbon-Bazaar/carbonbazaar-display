"use client";

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function FaviconAndThemeSync() {
  const { theme } = useTheme();

  useEffect(() => {
    const green = '#7FB069';
    const purple = '#7C3AED';
    const color = theme === 'dark' ? purple : green;

    // update CSS variable for leaf tint so inline SVGs can use it
    try {
      document.documentElement.style.setProperty('--leaf-tint', color);
    } catch (e) {
      // ignore on server or if not available
    }

    // Update meta theme-color (create if missing)
    let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = color;

    // Replace favicon links so the tab icon matches the site theme toggle
    const lightHref = '/favicon-light.svg';
    const darkHref = '/favicon-dark.svg';
    const href = theme === 'dark' ? darkHref : lightHref;

    const removeIcons = () => {
      const existing = Array.from(document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]'));
      existing.forEach((n) => n.parentNode?.removeChild(n));
    };

    removeIcons();

    const add = (rel: string, h: string, type?: string) => {
      const l = document.createElement('link');
      l.rel = rel;
      l.href = h;
      if (type) l.type = type;
      document.head.appendChild(l);
      return l;
    };

    // add both icon types
    add('icon', href, 'image/svg+xml');
    add('shortcut icon', href, 'image/svg+xml');
    add('apple-touch-icon', href);

    // Also set a small data URL override SVG to force-update some browsers
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><path fill='${color}' d='M32 6c-9 0-16 7-18 15-2 9 3 18 10 24 7 6 18 8 29 0 0-12-4-24-12-32C41 9 37 6 32 6z'/></svg>`;
    const dataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    // overwrite icon links with data URL so change is immediate
    const iconLinks = Array.from(document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]')) as HTMLLinkElement[];
    iconLinks.forEach((l) => (l.href = dataUrl));

    // done
  }, [theme]);

  return null;
}
