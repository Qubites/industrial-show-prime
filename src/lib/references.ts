// Clients on the references page, grouped by sector.
// Groups, order, clients and typical jobs: Kim's reply of 15/10/2026 ("Sv: Hjemmesiden – et par hurtige spørgsmål").
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
    name: { da: 'Entreprenører', en: 'Contractors' },
    typical: {
      da: 'Stålkonstruktioner, trapper og værn, montage og entreprenørservice',
      en: 'Steel structures, stairs and railings, installation and contractor services',
    },
    clients: [
      { name: 'Christiansen & Essenbæk', type: contractor },
      { name: 'NCC', type: contractor },
      { name: 'Züblin', type: contractor },
      { name: 'Raunstrup', type: contractor },
    ],
  },
  {
    name: { da: 'Forsyning, energi og industri', en: 'Utilities, energy and industry' },
    typical: {
      da: 'Service, reparation samt konstruktion og gallerier',
      en: 'Service and repairs, steel structures and access galleries',
    },
    clients: [
      { name: 'Beumer Group', type: { da: 'Transport- og sorteringsanlæg', en: 'Conveying and sorting systems' } },
      { name: 'Amager Ressource Center', type: { da: 'Affaldsenergianlæg, Amager', en: 'Waste-to-energy plant, Amager' } },
      { name: 'Vestforbrændingen', type: { da: 'Affaldsenergianlæg, Glostrup', en: 'Waste-to-energy plant, Glostrup' } },
      { name: 'HOFOR Bio4', type: { da: 'Biomassefyret kraftvarmeværk, Amagerværket', en: 'Biomass-fired CHP plant, Amagerværket' } },
    ],
  },
  {
    name: { da: 'Infrastruktur', en: 'Infrastructure' },
    typical: { da: 'Stålkonstruktion og entreprenørservice', en: 'Steel structures and contractor services' },
    clients: [
      { name: 'Banedanmark', type: { da: 'Jernbane', en: 'Railways' } },
      { name: 'Arkil', type: { da: 'Vej og anlæg', en: 'Roads and civil works' } },
    ],
  },
  {
    name: { da: 'Kommuner, bolig, ejendomme og service', en: 'Municipalities, housing, property and services' },
    typical: {
      da: 'Service og ad hoc-opgaver samt almindeligt smedearbejde som værn, trapper og reparation efter påkørsel',
      en: 'Service and ad hoc jobs, plus general smith work such as railings, stairs and repairs after collisions',
    },
    clients: [
      { name: 'Københavns Kommune', type: municipality },
      { name: 'Hvidovre Kommune', type: municipality },
      { name: 'Glostrup Kommune', type: municipality },
      { name: 'FSB', type: { da: 'Almene boliger, København', en: 'Social housing, Copenhagen' } },
      { name: 'ISS', type: { da: 'Facility service', en: 'Facility services' } },
      { name: 'Sampension', type: { da: 'Pensionsselskab', en: 'Pension fund' } },
    ],
  },
  {
    name: { da: 'Rådgivere og øvrige', en: 'Consultants and others' },
    clients: [
      { name: 'Rambøll', type: { da: 'Rådgivende ingeniører', en: 'Consulting engineers' } },
      { name: 'Artelia', type: { da: 'Rådgivende ingeniører', en: 'Consulting engineers' } },
    ],
  },
];
