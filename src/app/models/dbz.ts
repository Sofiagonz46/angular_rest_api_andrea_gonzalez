export interface DbzCharacter {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
}

export interface DbzResponse {
  items: DbzCharacter[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface DbzPlanet {
  id: number;
  name: string;
  isDestroyed: boolean;
  description: string;
  image: string;
}

export interface DbzTransformation {
  id: number;
  name: string;
  image: string;
  ki: string;
}

export interface DbzInfo extends DbzCharacter {
  originPlanet?: DbzPlanet | null;
  transformations?: DbzTransformation[];
}