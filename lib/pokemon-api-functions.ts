import { POKEMON_API } from '@/constants/api-urls';
import { PokemonInfoType, PokemonListResponse, PokemonTypeInfo, PokemonTypesResponse } from '@/types/pokemon-types';

/**
 *
 * The idea is to keep all the API calls in the same place to be easy to find and independent to the
 * implementation, also to be accesible for Server Actions (Server Components) and TanStack Query
 * calls (Client Components)
 *
 */

export async function getPokemonListFn(
  page: number,
  limit: number,
  types: string[] = []
): Promise<PokemonListResponse> {
  if (types.length > 0) return getPokemonListByTypeFn(page, limit, types);

  const offset = (page - 1) * limit;
  const response = await fetch(`${POKEMON_API}/pokemon?limit=${limit}&offset=${offset}`);
  const listRepsonse: PokemonListResponse = await response.json();

  return listRepsonse;
}

export async function getPokemonListByTypeFn(
  page: number,
  limit: number,
  types: string[]
): Promise<PokemonListResponse> {
  /**
   *
   * FYI: pokeapi.co didn't have a way to filter the Pokemon list using parameters like "type" so
   * this is a walkaround for the demo. This is not a real world solutions because the filtered should
   * be in the API side for performance and avoid multiple API calls.
   *
   */

  // First we are loading all the Pokemon using the list API with a big limit.
  const offset = (page - 1) * limit;
  const responseAll = await fetch(`${POKEMON_API}/pokemon?limit=2000`);
  const listRepsonse: PokemonListResponse = await responseAll.json();

  // Create a list to store names
  const pokemonInType: string[] = [];

  // Load the type information using the type API to retreave the names and store it
  for (const typeName of types) {
    const typeResponse = await fetch(`${POKEMON_API}/type/${typeName}`);
    const typeInfo: PokemonTypeInfo = await typeResponse.json();
    const pokemonNames = typeInfo.pokemon.map((item) => item.pokemon.name);

    pokemonInType.push(...pokemonNames);
  }

  // Filter the list of all the Pokemon checking if are included in the names in type
  const filteredPokemons = listRepsonse.results.filter((item) => pokemonInType.includes(item.name));

  // Return the new response with the count of the filtered Pokemon and custom offset/limit using slice
  return {
    count: filteredPokemons.length,
    results: filteredPokemons.slice(offset, offset + limit),
    next: null,
    previous: null,
  };
}

export async function getPokemonInfoFn(name: string): Promise<PokemonInfoType> {
  const response = await fetch(`${POKEMON_API}pokemon/${name}`);
  const info: PokemonInfoType = await response.json();

  return info;
}

export async function getPokemonTypesFn(): Promise<PokemonTypesResponse> {
  const response = await fetch(`${POKEMON_API}/type?limit=100`);
  const types: PokemonTypesResponse = await response.json();

  return types;
}
