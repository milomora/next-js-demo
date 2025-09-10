'use client';

import { usePokemonStore } from '@/store/pokemon-store';
import PokemonInfo from './pokemon-info';

/**
 *
 * This wrapper is just to validate if there's a selected Pokemont to show the info
 * ussing the Zustand store.
 *
 */

export default function PokemonInfoWrapper() {
  const selectedPokemon = usePokemonStore((state) => state.selected);

  if (!selectedPokemon) return <></>;

  return <PokemonInfo selectedPokemon={selectedPokemon} />;
}
