import ListButton from '@/components/list-button';
import PokemonInfoWrapper from '@/components/pokemon-info-wrapper';
import { getPokemonList } from '@/lib/pokemon-actions';
import Link from 'next/link';

type ListProps = {
  searchParams: Promise<{ page?: string }>;
};

const DEFAULT_LIMIT = 20;

export default async function List({ searchParams }: ListProps) {
  const page = Number((await searchParams).page) || 1;
  const pokemonList = await getPokemonList(page, DEFAULT_LIMIT);
  const totalPages = Math.ceil(pokemonList.count / DEFAULT_LIMIT);

  return (
    <div className="">
      <h1 className="text-2xl text-center my-5">Pokemon List</h1>

      <div className="grid grid-cols-3 border-blue-500 border-t border-b">
        <div className="border-r border-blue-500 p-3 flex flex-col">
          {pokemonList.results.map((item) => (
            <ListButton key={item.name} name={item.name} />
          ))}

          <div className="px-2 mt-3 flex gap-3 justify-center align-middle">
            <Link href={`/pokemon-list?page=${1}`}>{'<<'}</Link>
            <Link href={`/pokemon-list?page=${page - 1}`}>{'<'}</Link>
            <span>Page: {page}</span>
            <Link href={`/pokemon-list?page=${page + 1}`}>{'>'}</Link>
            <Link href={`/pokemon-list?page=${totalPages}`}>{'>>'}</Link>
          </div>
        </div>

        <PokemonInfoWrapper />
      </div>
    </div>
  );
}
