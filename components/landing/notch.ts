/*
 * Card outlines with the designer's quarter-circle notch on the inner top
 * corner. Drawn on a 300×400 grid; cards keep a fixed 3:4 aspect so the shape
 * scales uniformly. The same path is used as a CSS mask (fill + blur) and as an
 * SVG stroke (border / selected ring), so the ring follows the notch.
 */
export const CARD_PATHS = {
  // Notch top-right (faces the divider).
  buyer: 'M28 0H190A110 110 0 0 0 300 110V372A28 28 0 0 1 272 400H28A28 28 0 0 1 0 372V28A28 28 0 0 1 28 0Z',
  // Notch top-left (faces the divider).
  seller: 'M110 0H272A28 28 0 0 1 300 28V372A28 28 0 0 1 272 400H28A28 28 0 0 1 0 372V110A110 110 0 0 0 110 0Z',
} as const;

export function maskFor(path: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400' preserveAspectRatio='none'><path d='${path}'/></svg>`;
  const url = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  return {
    maskImage: url,
    WebkitMaskImage: url,
    maskSize: '100% 100%',
    WebkitMaskSize: '100% 100%',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
  } as const;
}
