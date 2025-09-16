'use server';

import { getPokemonInfoFn, getPokemonListFn } from '@/lib/pokemon-api-functions';
import { PokemonInfoType, PokemonListResponse } from '@/types/pokemon-types';

/**
 *
 * Server Actions that can be used for Server Components, they can be used for TanStack Query functions
 * in Client Components, but that generates an aditional internal API call (POST), that can be
 * usefull if we want to use the query actions as middleware but is not a common scenario.
 *
 */

export async function getPokemonList(page: number, limit: number): Promise<PokemonListResponse> {
  return getPokemonListFn(page, limit);
}

export async function getPokemonInfo(name: string): Promise<PokemonInfoType> {
  return getPokemonInfoFn(name);
}
