'use client';

import { getPokemonInfoFn } from '@/lib/pokemon-api-functions';
import { PokemonInfoType } from '@/types/pokemon-types';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

type PokemonInfoProps = {
  selectedPokemon: string;
};

/**
 *
 * This is a Client Component to test TanStack Query useQuery hook, initially the idea was
 * to use the functions defined in the Server Actions (@/lib/pokemon-actions.ts) in the
 * queryFn call, but that generates an extra API call (POST) so I move the functions outside
 * of the 'use server' file to be accesible for Client Components.
 *
 */

export default function PokemonInfo({ selectedPokemon }: PokemonInfoProps) {
  const { isPending, error, data } = useQuery<PokemonInfoType>({
    queryKey: ['info', selectedPokemon],
    queryFn: () => getPokemonInfoFn(selectedPokemon),
  });

  if (isPending) return 'Loading...';

  if (error || !data) return 'An error has occurred: ' + error.message;

  const pkmImage = data.sprites.front_default;
  const type = data.types.map((item) => item.type.name).join('/');

  return (
    <div className="col-span-2 p-3">
      <h1 className="text-3xl font-bold text-center capitalize">{data.name}</h1>

      <div className="grid grid-cols-2 mt-5">
        {pkmImage && (
          <div>
            <Image width={300} height={300} src={pkmImage} alt={`${data.name} sprite`} />
          </div>
        )}
        <div className="text-xl flex flex-col gap-3">
          <p>
            <strong>Id:</strong> {data.id}
          </p>
          <p>
            <strong>Order:</strong> {data.order}
          </p>
          <p>
            <strong>Type:</strong> {type}
          </p>
        </div>
      </div>
    </div>
  );
}
