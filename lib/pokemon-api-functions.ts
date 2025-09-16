import { POKEMON_API } from '@/constants/api-urls';
import { PokemonInfoType, PokemonListResponse } from '@/types/pokemon-types';

/**
 *
 * The idea is to keep all the API calls in the same place to be easy to find and independent to the
 * implementation, also to be accesible for Server Actions (Server Components) and TanStack Query
 * calls (Client Components)
 *
 */

export async function getPokemonListFn(page: number, limit: number): Promise<PokemonListResponse> {
  const offset = (page - 1) * limit;
  const response = await fetch(`${POKEMON_API}/pokemon?limit=${limit}&offset=${offset}`);
  const list: PokemonListResponse = await response.json();

  return list;
}

export async function getPokemonInfoFn(name: string): Promise<PokemonInfoType> {
  const response = await fetch(`${POKEMON_API}pokemon/${name}`);
  const info: PokemonInfoType = await response.json();

  return info;
}
