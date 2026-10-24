import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://carbonbazaar.shop',
      lastModified: new Date('2024-05-31'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://carbonbazaar.shop/about',
      lastModified: new Date('2026-10-24'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
