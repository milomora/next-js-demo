export type ListBaseResponse = {
  count: number;
  next: string | null;
  previous: string | null;
};

export type PokemonListResponse = ListBaseResponse & {
  results: PokemonListItem[];
};

export type PokemonListItem = {
  name: string;
  url: string;
};

export type PokemonInfoType = {
  id: number;
  is_default: boolean;
  name: string;
  order: number;
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
};

export type PokemonTypesResponse = ListBaseResponse & {
  results: PokemonType[];
};

export type PokemonType = {
  name: string;
  url: string;
};

export type PokemonTypeInfo = {
  name: string;
  id: number;
  pokemon: {
    slot: number;
    pokemon: PokemonListItem;
  }[];
};
