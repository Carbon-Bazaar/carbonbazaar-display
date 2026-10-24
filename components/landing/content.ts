/**
 * Landing page copy & data — carried over from the previous sections so the
 * story, numbers and section ids (used by in-page links and the dashboard
 * header's "/#mission" style links) stay the same.
 */

export const SECTION_IDS = {
  home: 'home',
  backedBy: 'backed-by',
  mission: 'mission',
  whatWeDo: 'what-we-do',
  whyUs: 'why-us',
  howItWorks: 'how-it-works',
  impact: 'impact',
  contact: 'contact',
} as const;

export const NAV_LINKS = [
  { label: 'Mission', id: SECTION_IDS.mission },
  { label: 'What we do', id: SECTION_IDS.whatWeDo },
  { label: 'How it works', id: SECTION_IDS.howItWorks },
  { label: 'Impact', id: SECTION_IDS.impact },
  { label: 'Contact', id: SECTION_IDS.contact },
] as const;

/** Separate page linked from the navbar (between Impact and Contact) and the footer. */
export const ABOUT_LINK = { label: 'About us', href: '/about' } as const;

export const ART = {
  mission: '/images/landing/art/kyc-personal.webp',
  whatWeDo: '/images/landing/art/add-plot.webp',
  whyUs: '/images/landing/art/payment-history.webp',
  impact: '/images/landing/art/my-plots.webp',
} as const;

export const HERO = {
  eyebrow: 'Goa · India’s MSME carbon marketplace',
  lines: ['Restore ecosystems.', 'Earn verified carbon credits.'],
  description:
    'Empowering communities and landowners to convert carbon sequestration into tradeable credits through a transparent, blockchain-powered marketplace.',
  videoSrc: 'https://videos.pexels.com/video-files/1409899/1409899-uhd_2560_1440_25fps.mp4',
} as const;

export const SUPPORTERS = [
  { name: 'Government of Goa', logo: '/supporters/Goa Government.png', description: 'State government support for innovation and sustainability' },
  { name: 'FIIRE Goa', logo: '/supporters/Fire-logo.webp', description: 'Foundation for Innovation, Incubation, Research & Entrepreneurship' },
  { name: 'MeitY', logo: '/supporters/meity.png', description: 'Ministry of Electronics & Information Technology, India' },
  { name: 'SPC Goa', logo: null, description: 'Startup Promotion Cell, Government of Goa' },
] as const;

/** Photographs for the sticky deck — one per editorial chapter. */
export const PLACES = [
  { src: '/images/landing/places/canacona-mangrove.webp', place: 'Canacona', note: 'Coastal mangroves' },
  { src: '/images/landing/places/netravali-cashew.webp', place: 'Netravali', note: 'Cashew plantations' },
  { src: '/images/landing/places/quepem-agroforestry.webp', place: 'Quepem', note: 'Agroforestry' },
] as const;

export const MISSION = {
  id: SECTION_IDS.mission,
  index: '01',
  label: 'Our Mission',
  statement: 'Making carbon markets accessible to all.',
  paragraphs: [
    'Many communities preserve forests, plantations, and coastal ecosystems but can’t access carbon markets due to complex verification processes, high costs, and lack of transparency.',
    'CarbonBazaar simplifies this by integrating project onboarding, third-party verification workflows, and blockchain-based tokenization. The result is a trusted marketplace where environmental impact is transparently recorded, traded, and retired.',
  ],
  stats: [
    { value: 100, suffix: '%', label: 'Transparent' },
    { value: 0, suffix: '', label: 'Middlemen' },
    { value: 24, suffix: '/7', label: 'Access' },
  ],
} as const;

export const FEATURES = {
  id: SECTION_IDS.whatWeDo,
  index: '02',
  label: 'What we do',
  statement: 'An end-to-end platform from restoration to verified, tradeable credits.',
  items: [
    { title: 'Project Onboarding', body: 'Streamlined registration for communities and landowners to submit ecosystem restoration projects with guided workflows.' },
    { title: 'Third-Party Verification', body: 'Integrated verification workflows connecting projects with accredited auditors to validate carbon sequestration claims.' },
    { title: 'Blockchain Tokenization', body: 'Every verified credit is tokenized on-chain, ensuring traceability and eliminating the risk of double counting.' },
    { title: 'Direct Marketplace', body: 'Connecting communities directly with buyers, with no middlemen, fair pricing, and complete transaction transparency.' },
    { title: 'Fractional Credits', body: 'Making carbon offsetting accessible to MSMEs through affordable fractional ownership of verified credits.' },
    { title: 'Impact Tracking', body: 'Real-time dashboards showing measurable environmental impact, credit retirement status, and community income generated.' },
  ],
} as const;

export const REASONS = {
  id: SECTION_IDS.whyUs,
  index: '03',
  label: 'Why CarbonBazaar',
  statement: 'Building trust through transparency, technology, and community empowerment.',
  items: [
    { title: 'No Middlemen', body: 'Direct connections between communities and buyers eliminate unnecessary intermediaries and reduce costs.' },
    { title: 'Blockchain-Verified', body: 'Every credit is tokenized and recorded on-chain for immutable proof of authenticity and ownership.' },
    { title: 'MSME-Friendly', body: 'Fractional credit ownership makes carbon offsetting accessible and affordable for small businesses.' },
    { title: 'Community-First', body: 'Fair compensation models ensure that the communities doing the restoration work benefit directly.' },
    { title: 'Regulation-Ready', body: 'Built to comply with emerging carbon regulations and international verification standards.' },
  ],
} as const;

export const CHAPTERS = [MISSION, FEATURES, REASONS] as const;

export const JOURNEY = {
  eyebrow: 'The process',
  title: 'How it works',
  intro: 'From project registration to credit retirement, a seamless journey in five simple steps.',
  steps: [
    { title: 'Register Your Project', body: 'Communities and landowners submit ecosystem details through our guided onboarding portal.', art: '/images/landing/art/kyc-land.webp' },
    { title: 'Get Verified', body: 'Accredited third-party auditors validate carbon sequestration claims and environmental impact.', art: '/images/landing/art/kyc-documents.webp' },
    { title: 'Tokenize Credits', body: 'Verified credits are tokenized on blockchain, ensuring traceability and preventing double counting.', art: '/images/landing/art/credit-issuance.webp' },
    { title: 'Trade on Marketplace', body: 'Connect directly with buyers on our transparent marketplace, with fair pricing and no intermediaries.', art: '/images/landing/art/kyc-payout.webp' },
    { title: 'Retire & Report', body: 'Credits are retired transparently with full impact reporting for buyers and regulatory compliance.', art: '/images/landing/art/kyc-review.webp' },
  ],
} as const;

export const IMPACT = {
  eyebrow: 'Our vision',
  title: '2030 Impact Goals',
  intro: 'Ambitious targets driving us toward a more sustainable and equitable future.',
  goals: [
    { value: 10000, prefix: '', suffix: '+', label: 'Coastal Community Members Empowered' },
    { value: 100, prefix: '₹', suffix: ' Cr', label: 'Crores in Carbon Trades Facilitated' },
    { value: 50000, prefix: '', suffix: '+', label: 'SMEs Onboarded into Sustainable Offsetting' },
    { value: 500, prefix: '', suffix: '+', label: 'Hectares of Ecosystem Restored' },
  ],
} as const;

export const INVITE = {
  eyebrow: 'Get started',
  title: 'Ready to join the carbon revolution?',
  body: 'Whether you’re a community restoring ecosystems or a business looking to offset emissions, we’d love to hear from you.',
  email: 'info@carbonbazaar.co.in',
  linkedin: 'https://www.linkedin.com/company/carbon-bazaar/',
} as const;

export const FOOTER = {
  blurb:
    'A climate-tech platform enabling communities to convert ecosystem restoration into verified carbon credits through a transparent digital marketplace.',
  email: 'info@carbonbazaar.co.in',
  linkedin: 'https://www.linkedin.com/company/carbon-bazaar/',
  location: 'Goa, India',
  links: [
    { label: 'Home', id: SECTION_IDS.home },
    { label: 'Mission', id: SECTION_IDS.mission },
    { label: 'What We Do', id: SECTION_IDS.whatWeDo },
    { label: 'How It Works', id: SECTION_IDS.howItWorks },
    { label: 'Impact', id: SECTION_IDS.impact },
    { label: 'Contact', id: SECTION_IDS.contact },
  ],
} as const;

/* ───────────────────────── About page ───────────────────────── */

// Images on this page are used nowhere else on the site. Landscape photos are CC0 1.0 (no attribution
// required): hero "Sal River in Cavelossim, Goa" by Hardeep Asrani (wordpress.org/photos); band "Western
// Ghats in Kanyakumari 04" by Aswin Abi and closing "Monsoon view of the Sengottai Gap" by Planemad (Wikimedia Commons).
export const ABOUT = {
  hero: {
    eyebrow: 'About us',
    title: 'Climate equity for all.',
    body: 'We are building a carbon marketplace where the communities who protect forests, plantations and coastlines are the ones who benefit.',
    art: '/images/about/hero-sal-river.webp',
  },
  story: {
    label: 'About us',
    photo: '/images/team/founders.webp',
    photoAlt: 'Founders Pranav Naik and Shrinivas Inamdar',
    art: '/images/about/ghats-paddy.webp',
    description:
      'CarbonBazaar is a climate-tech platform from Goa that helps communities and landowners turn the forests, plantations and coastlines they protect into verified carbon credits. We take every project from onboarding through third-party verification to on-chain tokenization, then sell fractional credits on a transparent marketplace with no middlemen, so small businesses can offset affordably and the people restoring the land are fairly paid.',
  },
  talk: 'Want to talk about carbon, land or partnerships?',
  team: {
    title: 'The people behind CarbonBazaar',
    // Square portraits in /public/images/team/ (set `photo: null` to show the placeholder instead).
    members: [
      { name: 'Pranav Naik', role: 'Founder & CEO', education: 'Don Bosco College of Engineering, Goa', initials: 'PN', photo: '/images/team/pranav-naik.webp' as string | null },
      { name: 'Shrinivas Inamdar', role: 'Co-founder & COO', education: 'Don Bosco College of Engineering, Goa', initials: 'SI', photo: '/images/team/shrinivas-inamdar.webp' as string | null },
    ],
  },
  closing: {
    title: 'From Goa’s coasts, for the planet.',
    art: '/images/about/monsoon-paddy.webp',
    rows: [
      {
        text: 'Businesses and MSMEs: offset your emissions with verified, fractional carbon credits.',
        cta: 'Buy credits',
        href: 'mailto:info@carbonbazaar.co.in?subject=Buying%20carbon%20credits',
      },
      {
        text: 'Landowners and communities: turn the ecosystems you protect into a new source of income.',
        cta: 'For landowners',
        href: 'mailto:info@carbonbazaar.co.in?subject=Registering%20my%20land',
      },
      {
        text: 'Follow our journey and build climate equity with us.',
        cta: 'Connect on LinkedIn',
        href: 'https://www.linkedin.com/company/carbon-bazaar/',
      },
    ],
  },
} as const;
