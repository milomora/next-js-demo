import PokemonInfoWrapper from '@/components/pokemon-info-wrapper';
import { DEFAULT_LIMIT } from '@/constants/list-constants';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import ListWithHydration from './list-hydration';
import { getPokemonListFn } from '@/lib/pokemon-api-functions';

type ListProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function List({ searchParams }: ListProps) {
  const page = Number((await searchParams).page) || 1;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['list', page],
    queryFn: () => getPokemonListFn(page, DEFAULT_LIMIT),
  });

  return (
    <div className="">
      <h1 className="text-2xl text-center my-5">
        <strong>Pokemon List</strong> (Using Hydration)
      </h1>

      <div className="grid grid-cols-3 border-blue-500 border-t border-b">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ListWithHydration initialPage={page} />
        </HydrationBoundary>

        <PokemonInfoWrapper />
      </div>
    </div>
  );
}
