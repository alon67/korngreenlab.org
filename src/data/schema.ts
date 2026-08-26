// Schema.org entity graph for the site, emitted as JSON-LD from BaseLayout.
//
// The nodes below are defined once and cross-referenced by @id, so search
// engines, citation indexes and retrieval systems resolve the lab, its
// principal investigator and its host institution as one connected entity
// rather than as repeated strings on separate pages.
//
// Note on type choice: the lab is modelled as a ResearchOrganization (a
// schema.org subtype of Organization) rather than EducationalOrganization or
// MedicalBusiness. It is a research group inside a university, it does not
// award degrees itself, and it treats no patients — ResearchOrganization is
// the accurate type and inherits everything consumers read from Organization.

export const SITE = "https://www.korngreenlab.org";

export const IDS = {
  website: `${SITE}/#website`,
  lab: `${SITE}/#lab`,
  person: `${SITE}/#alon-korngreen`,
  gonda: `${SITE}/#gonda-center`,
  university: "https://www.biu.ac.il/#organization",
} as const;

const barIlan = {
  "@type": "CollegeOrUniversity",
  "@id": IDS.university,
  name: "Bar-Ilan University",
  alternateName: "אוניברסיטת בר-אילן",
  url: "https://www.biu.ac.il/",
  sameAs: [
    "https://en.wikipedia.org/wiki/Bar-Ilan_University",
    "https://www.wikidata.org/wiki/Q798941",
    "https://ror.org/03kgsv495",
  ],
};

const gondaCenter = {
  "@type": "ResearchOrganization",
  "@id": IDS.gonda,
  name: "The Leslie and Susan Gonda Multidisciplinary Brain Research Center",
  url: "https://brain.biu.ac.il/",
  parentOrganization: { "@id": IDS.university },
};

const address = {
  "@type": "PostalAddress",
  streetAddress: "Building 901, Bar-Ilan University",
  addressLocality: "Ramat Gan",
  postalCode: "5290002",
  addressCountry: "IL",
};

export const labNode = {
  "@type": "ResearchOrganization",
  "@id": IDS.lab,
  name: "The Korngreen Lab",
  alternateName: "Korngreen Laboratory of Cellular and Computational Neurophysiology",
  url: `${SITE}/`,
  description:
    "Research group at the Leslie and Susan Gonda Multidisciplinary Brain Research Center, " +
    "Bar-Ilan University, studying single-neuron computation through patch-clamp " +
    "electrophysiology and reference-grade computational models of neuronal excitability.",
  logo: `${SITE}/og-image.jpg`,
  image: `${SITE}/og-image.jpg`,
  email: "alon.korngreen@biu.ac.il",
  telephone: "+972-3-5318224",
  address,
  parentOrganization: { "@id": IDS.gonda },
  memberOf: [{ "@id": IDS.gonda }, { "@id": IDS.university }],
  founder: { "@id": IDS.person },
  employee: { "@id": IDS.person },
  knowsAbout: [
    "Cellular neurophysiology",
    "Computational neuroscience",
    "Patch-clamp electrophysiology",
    "Single-neuron computation",
    "Ion channel biophysics",
    "Dendritic integration",
    "Neuronal excitability",
    "Hodgkin-Huxley models",
    "Basal ganglia",
    "Synaptic plasticity",
  ],
  researchArea: "Cellular and Computational Neurophysiology",
};

export const personNode = {
  "@type": "Person",
  "@id": IDS.person,
  name: "Alon Korngreen",
  givenName: "Alon",
  familyName: "Korngreen",
  alternateName: "אלון קורנגרין",
  honorificPrefix: "Prof.",
  jobTitle: "Professor of Neurophysiology",
  description:
    "Israeli biophysicist and neuroscientist. Full professor at Bar-Ilan University and head " +
    "of the Leslie and Susan Gonda Multidisciplinary Brain Research Center, working on " +
    "single-neuron computation, ion channel biophysics and computational models of cortical neurons.",
  url: `${SITE}/curriculum-vita/`,
  email: "alon.korngreen@biu.ac.il",
  telephone: "+972-3-5318224",
  worksFor: [{ "@id": IDS.university }, { "@id": IDS.gonda }],
  affiliation: { "@id": IDS.lab },
  workLocation: address,
  identifier: [
    { "@type": "PropertyValue", propertyID: "ORCID", value: "0000-0002-2036-6160" },
  ],
  sameAs: [
    "https://orcid.org/0000-0002-2036-6160",
    "https://scholar.google.co.il/citations?user=9DUsX7MAAAAJ",
    "https://www.researchgate.net/profile/Alon_Korngreen",
    "https://he.wikipedia.org/wiki/%D7%90%D7%9C%D7%95%D7%9F_%D7%A7%D7%95%D7%A8%D7%A0%D7%92%D7%A8%D7%99%D7%9F",
    "https://www.linkedin.com/in/alonkorngreen/",
    "https://x.com/AlonKorngreen",
    "https://www.youtube.com/c/AlonKorngreen/",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Ben-Gurion University of the Negev",
    url: "https://www.bgu.ac.il/",
  },
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", educationalLevel: "PhD", name: "Ph.D. in Biophysics, Ben-Gurion University (1997)" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", educationalLevel: "Masters", name: "M.Sc. in Biophysics, Ben-Gurion University (1993)" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", educationalLevel: "Bachelor", name: "B.Sc. in Chemistry, Ben-Gurion University (1991)" },
  ],
  knowsAbout: labNode.knowsAbout,
  knowsLanguage: ["en", "he"],
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": IDS.website,
  name: "The Korngreen Lab",
  url: `${SITE}/`,
  inLanguage: "en",
  publisher: { "@id": IDS.lab },
  about: { "@id": IDS.lab },
};

/** Nodes emitted on every page so the entity graph is resolvable from any entry point. */
export const baseGraph = [websiteNode, labNode, personNode, gondaCenter, barIlan];

/** A WebPage node tying the current URL to the lab and its primary entity. */
export function pageNode({
  url,
  name,
  description,
  language = "en",
  primaryEntity,
}: {
  url: string;
  name: string;
  description?: string;
  language?: string;
  primaryEntity?: string;
}) {
  const node: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    inLanguage: language,
    isPartOf: { "@id": IDS.website },
    about: { "@id": IDS.lab },
  };
  if (description) node.description = description;
  if (primaryEntity) node.mainEntity = { "@id": primaryEntity };
  return node;
}
