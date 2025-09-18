import PokemonInfoWrapper from '@/components/pokemon-info-wrapper';
import { DEFAULT_LIMIT } from '@/constants/list-constants';
import { getPokemonList } from '@/lib/pokemon-actions';
import ListWithProps from './list-props';
import Filters from '@/components/filters';

type ListProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function List({ searchParams }: ListProps) {
  const page = Number((await searchParams).page) || 1;
  const pokemonList = await getPokemonList(page, DEFAULT_LIMIT);

  return (
    <div className="">
      <h1 className="text-2xl text-center my-5">
        <strong>Pokemon List</strong> (Using initial props)
      </h1>

      <Filters />

      <div className="grid grid-cols-3 border-blue-500 border-t border-b">
        <ListWithProps initialData={pokemonList} initialPage={page} />

        <PokemonInfoWrapper />
      </div>
    </div>
  );
}
