// Clients on the references page, grouped by sector.
// Names: the company's old site (customer logos and the "Om os"/"Kompetencer" texts).
// Typical jobs per sector: the company's own list of competences on the old site.
// "type" says what kind of place the client is – not what we did there.

export type Text = { da: string; en: string };

export type Client = {
  name: string;
  type?: Text;
  // Filled in when the company gives us scope and year for a job.
  scope?: Text;
};

export type Sector = {
  name: Text;
  typical?: Text;
  clients: Client[];
};

const municipality: Text = { da: 'Kommune', en: 'Municipality' };
const contractor: Text = { da: 'Entreprenør', en: 'Contractor' };

export const sectors: Sector[] = [
  {
    name: { da: 'Forsyning og energi', en: 'Utilities and energy' },
    typical: {
      da: 'Kedelanlæg, rustfri rør- og pladearbejde, hårdpålægning af slidstål, service og reparationer',
      en: 'Boiler plants, stainless pipe and plate work, hardfacing of wear steel, service and repairs',
    },
    clients: [
      { name: 'Amager Ressource Center', type: { da: 'Affaldsenergianlæg, Amager', en: 'Waste-to-energy plant, Amager' } },
      { name: 'Vestforbrændingen', type: { da: 'Affaldsenergianlæg, Glostrup', en: 'Waste-to-energy plant, Glostrup' } },
      { name: 'HOFOR Bio4', type: { da: 'Biomassefyret kraftvarmeværk, Amagerværket', en: 'Biomass-fired CHP plant, Amagerværket' } },
      { name: 'Vølund', type: { da: 'Leverandør af kedelanlæg', en: 'Boiler plant supplier' } },
    ],
  },
  {
    name: { da: 'Infrastruktur', en: 'Infrastructure' },
    typical: { da: 'Stålkonstruktioner, værn og montage', en: 'Steel structures, railings and installation' },
    clients: [
      { name: 'Banedanmark', type: { da: 'Jernbane', en: 'Railways' } },
      { name: 'Arkil', type: { da: 'Vej og anlæg', en: 'Roads and civil works' } },
    ],
  },
  {
    name: { da: 'Entreprenører', en: 'Contractors' },
    typical: {
      da: 'Stålkonstruktioner, trapper og værn, montage og entreprenørservice',
      en: 'Steel structures, stairs and railings, installation and contractor services',
    },
    clients: [
      { name: 'Züblin', type: contractor },
      { name: 'Raunstrup', type: contractor },
      { name: 'Christiansen & Essenbæk', type: contractor },
    ],
  },
  {
    name: { da: 'Industri', en: 'Industry' },
    typical: {
      da: 'Certifikatsvejsning, gallerier, platforme og rørbroer, tekniske installationer',
      en: 'Certified welding, access galleries, platforms and pipe bridges, technical installations',
    },
    clients: [
      { name: 'Maersk', type: { da: 'Shipping og logistik', en: 'Shipping and logistics' } },
      { name: 'Siemens', type: { da: 'Industri og energi', en: 'Industry and energy' } },
      { name: 'Beumer Group', type: { da: 'Transport- og sorteringsanlæg', en: 'Conveying and sorting systems' } },
    ],
  },
  {
    name: { da: 'Kommuner og boligselskaber', en: 'Municipalities and housing' },
    typical: {
      da: 'Værn, trapper, låger og riste – også reparation efter påkørsel',
      en: 'Railings, stairs, gates and grates – including repairs after collisions',
    },
    clients: [
      { name: 'Københavns Kommune', type: municipality },
      { name: 'Hvidovre Kommune', type: municipality },
      { name: 'Glostrup Kommune', type: municipality },
      { name: 'FSB', type: { da: 'Almene boliger, København', en: 'Social housing, Copenhagen' } },
    ],
  },
  {
    name: { da: 'Ejendomme og service', en: 'Property and facility services' },
    typical: { da: 'Service, reparationer og ad hoc-opgaver', en: 'Service, repairs and ad hoc jobs' },
    clients: [
      { name: 'ISS', type: { da: 'Facility service', en: 'Facility services' } },
      { name: 'CBRE', type: { da: 'Ejendomsadministration', en: 'Property management' } },
      { name: 'Arbejdernes Landsbank', type: { da: 'Bank', en: 'Bank' } },
      { name: 'DR Byen', type: { da: 'DR’s domicil, Ørestad', en: 'DR headquarters, Ørestad' } },
    ],
  },
  {
    name: { da: 'Rådgivere og øvrige', en: 'Consultants and others' },
    clients: [
      { name: 'Rambøll', type: { da: 'Rådgivende ingeniører', en: 'Consulting engineers' } },
      { name: 'Tolderlund' },
    ],
  },
];
