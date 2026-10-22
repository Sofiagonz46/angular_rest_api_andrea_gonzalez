export interface DemonSlayerCharacter {
  id: number;
  name: string;
  age?: number | null;
  gender?: string;
  race?: string;
  description?: string;
  img: string;
  quote?: string;
}

export interface DemonSlayerResponse {
  pagination: {
    totalElements: number;
    elementsOnPage: number;
    currentPage: number;
    totalPages: number;
    previousPage: string;
    nextPage: string;
  };
  content: DemonSlayerCharacter[];
}

export interface DemonSlayerCombatStyle {
  id: number;
  name: string;
  description?: string;
  img?: string;
}

export interface DemonSlayerInfo extends DemonSlayerCharacter {
  first_arc_appearance?: { name: string; description?: string } | null;
  affiliation?: { name: string; description?: string } | null;
  combat_style?: DemonSlayerCombatStyle[] | null;
}

export interface DemonSlayerDetailResponse {
  content: DemonSlayerInfo[];
}