'use client';

import { usePokemonStore } from '@/store/pokemon-store';

type ListButtonProps = {
  name: string;
};

/**
 *
 * This is a Client Component to use in the list because we need to be a client one to interact
 * with the Zustand state to read/set the selected Pokemon and the interactions with the favorites
 *
 */

export default function ListButton({ name }: ListButtonProps) {
  const favoriteList = usePokemonStore((state) => state.favoriteList);
  const selected = usePokemonStore((state) => state.selected);
  const setSelected = usePokemonStore((state) => state.setSelected);
  const addFavorites = usePokemonStore((state) => state.addFavorites);
  const removeFavorites = usePokemonStore((state) => state.removeFavorites);

  const isFavorite = favoriteList.includes(name);
  const isSelected = name === selected;

  return (
    <div className="py-1 flex justify-between">
      <a className={`cursor-pointer capitalize ${isSelected ? 'text-blue-500' : ''}`} onClick={() => setSelected(name)}>
        <span>{name}</span>
      </a>

      {isFavorite ? (
        <a className="cursor-pointer" onClick={() => removeFavorites(name)}>
          ❤️
        </a>
      ) : (
        <a className="cursor-pointer" onClick={() => addFavorites(name)}>
          🤍
        </a>
      )}
    </div>
  );
}
