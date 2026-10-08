// The marketplace is a separate app (see /marketplace). In production it is
// served from this same domain at /marketplace; in development it runs on its
// own port (set in .env.development).
export const MARKETPLACE_URL = process.env.NEXT_PUBLIC_MARKETPLACE_URL ?? '/marketplace';

export function marketplaceHref(auth?: 'login' | 'signup') {
  return auth ? `${MARKETPLACE_URL}?auth=${auth}` : MARKETPLACE_URL;
}
