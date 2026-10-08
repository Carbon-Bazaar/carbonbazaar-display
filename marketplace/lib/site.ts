// URL of the main CarbonBazaar website. Empty in production, because the
// marketplace is served from the same domain under /marketplace.
export const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL ?? '';

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function websiteHref(path: string = '/') {
  return `${WEBSITE_URL}${path}`;
}
