// Company facts shown across the site. Source: the company's own pages
// (Webador draft, Oct 2026) and the Nordcert certificate.
export const company = {
  name: 'Smedefirmaet L. S. Stålmontage ApS',
  // Non-breaking spaces keep "L. S." and "STÅLMONTAGE ApS" together when the name wraps.
  displayName: 'SMEDEFIRMAET L.\u00a0S. STÅLMONTAGE\u00a0ApS',
  cvr: '70963116',
  pnr: '1007967612',
  street: 'Sydvestvej 111 D',
  city: '2600 Glostrup',
  phone: '+45 43 45 11 49',
  phoneHref: 'tel:+4543451149',
  email: 'mail@ls-staalmontage.dk',
  bank: { name: 'Danske Bank', reg: '4366', account: '11372295' },
  social: {
    instagram: 'https://www.instagram.com/smedefirmaetl.s.staalmontage/',
    linkedin: 'https://www.linkedin.com/company/76579691/',
    facebook: 'https://www.facebook.com/profile.php?id=100063684333078',
  },
} as const;

export type SocialPlatform = keyof typeof company.social;
