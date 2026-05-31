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
  ];
}
