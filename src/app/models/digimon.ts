export interface DigimonSummary {
  id: number;
  name: string;
  href: string;
  image: string;
}

export interface DigimonResponse {
  content: DigimonSummary[];
  pageable: {
    currentPage: number;
    elementsOnPage: number;
    totalElements: number;
    totalPages: number;
    previousPage: string;
    nextPage: string;
  };
}

export interface DigimonEvolution {
  id: number;
  digimon: string;
  condition?: string;
  image?: string;
}

export interface DigimonInfo {
  id: number;
  name: string;
  xAntibody?: boolean;
  releaseDate?: string;
  images?: { href: string }[];
  levels?: { id: number; level: string }[];
  types?: { id: number; type: string }[];
  attributes?: { id: number; attribute: string }[];
  fields?: { id: number; field: string }[];
  descriptions?: { origin: string; language: string; description: string }[];
  skills?: { id: number; skill: string; translation?: string; description?: string }[];
  priorEvolutions?: DigimonEvolution[];
  nextEvolutions?: DigimonEvolution[];
}