'use client';

import ListButton from '@/components/list-button';
import { DEFAULT_LIMIT } from '@/constants/list-constants';
import { getPokemonListFn } from '@/lib/pokemon-api-functions';
import { updateQueryString } from '@/lib/utils';
import { usePokemonStore } from '@/store/pokemon-store';
import { PokemonListResponse } from '@/types/pokemon-types';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

type ListProps = {
  initialPage: number;
};

export default function ListWithHydration({ initialPage }: ListProps) {
  const [page, setPage] = useState(initialPage);
  const filters = usePokemonStore((state) => state.filters);

  const { data: pokemonList } = useQuery<PokemonListResponse>({
    queryKey: ['list', page, filters.types],
    queryFn: () => getPokemonListFn(page, DEFAULT_LIMIT, filters.types),
  });

  if (!pokemonList) return 'Loading...';

  const totalPages = Math.ceil(pokemonList.count / DEFAULT_LIMIT);

  const updatePage = (newPage: number) => {
    setPage(newPage);
    updateQueryString('page', `${newPage}`);
  };

  return (
    <div className="border-r border-blue-500 p-3 flex flex-col">
      {pokemonList.results.map((item) => (
        <ListButton key={item.name} name={item.name} />
      ))}

      <div className="px-2 mt-3 flex gap-3 justify-center align-middle">
        <a className="cursor-pointer" onClick={() => updatePage(1)}>
          {'<<'}
        </a>
        <a className="cursor-pointer" onClick={() => updatePage(page - 1)}>
          {'<'}
        </a>
        <span>
          Page: {page}/{totalPages}
        </span>
        <a className="cursor-pointer" onClick={() => updatePage(page + 1)}>
          {'>'}
        </a>
        <a className="cursor-pointer" onClick={() => updatePage(totalPages)}>
          {'>>'}
        </a>
      </div>
    </div>
  );
}
