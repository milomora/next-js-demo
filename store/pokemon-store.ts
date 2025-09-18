import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PokemonStore = {
  selected: string | null;
  setSelected: (value: string) => void;
  favoriteList: string[];
  addFavorites: (value: string) => void;
  removeFavorites: (value: string) => void;
  filters: {
    types: string[];
  };
  addFilterTypes: (value: string) => void;
  removeFilterTypes: (value: string) => void;
};

export const usePokemonStore = create<PokemonStore>()(
  persist(
    (set) => ({
      selected: null,
      setSelected: (value) => set({ selected: value }),
      favoriteList: [],
      addFavorites: (value) =>
        set((state) => ({
          favoriteList: [...state.favoriteList, value],
        })),
      removeFavorites: (value) =>
        set((state) => ({
          favoriteList: state.favoriteList.filter((item) => item !== value),
        })),
      filters: {
        types: [],
      },
      addFilterTypes: (value) =>
        set((state) => ({
          filters: {
            ...state.filters,
            types: [...state.filters.types, value],
          },
        })),
      removeFilterTypes: (value) =>
        set((state) => ({
          favoriteList: state.favoriteList.filter((item) => item !== value),
          filters: {
            ...state.filters,
            types: state.filters.types.filter((item) => item !== value),
          },
        })),
    }),
    {
      name: 'pokemon-store',
    }
  )
);
