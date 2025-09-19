import { GET_POKEMONS } from "@/graphql/queries";
import { GetPokemonsResponse, Pokemon } from "@/types/pokemon";
import { useQuery } from "@apollo/client/react";
import { useMemo, useState } from "react";

export const useSearchPokemons = () => {
  const { data, loading, error } = useQuery<GetPokemonsResponse>(GET_POKEMONS, {
    variables: {
      first: 10,
    },
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter Pokemon based on search term (case-insensitive)
  const filteredPokemons = useMemo<Pokemon[]>(() => {
    if (!searchTerm.trim()) {
      return data?.pokemons || [];
    }

    return (
      data?.pokemons.filter((pokemon: Pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    );
  }, [data, searchTerm]);

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };
  return {
    searchTerm,
    filteredPokemons,
    handleSearch,
    loading,
    error,
    pokemons: data?.pokemons || [],
  };
};
