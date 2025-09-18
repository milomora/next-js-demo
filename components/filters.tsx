'use client';

import { getPokemonTypesFn } from '@/lib/pokemon-api-functions';
import { usePokemonStore } from '@/store/pokemon-store';
import { PokemonTypesResponse } from '@/types/pokemon-types';
import { useQuery } from '@tanstack/react-query';

export default function Filters() {
  const { data: typesList } = useQuery<PokemonTypesResponse>({
    queryKey: ['types'],
    queryFn: getPokemonTypesFn,
  });

  const filters = usePokemonStore((state) => state.filters);
  const addFilterTypes = usePokemonStore((state) => state.addFilterTypes);
  const removeFilterTypes = usePokemonStore((state) => state.removeFilterTypes);

  const handleCheckChange = (checked: boolean, type: string) => {
    if (checked) addFilterTypes(type);
    else removeFilterTypes(type);
  };

  if (!typesList) return <></>;

  return (
    <div className="border-blue-500 border-t p-2">
      <span className="font-bold">Types:</span>
      <ul className="flex gap-3 flex-wrap mt-2">
        {typesList.results.map((item) => (
          <span key={item.name} className="flex gap-1">
            <input
              type="checkbox"
              id={`check-${item.name}`}
              defaultChecked={filters.types.includes(item.name)}
              onChange={(event) => {
                handleCheckChange(event.target.checked, item.name);
              }}
            />
            <label htmlFor={`check-${item.name}`} className="text-sm capitalize">
              {item.name}
            </label>
          </span>
        ))}
      </ul>
    </div>
  );
}
