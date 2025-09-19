import { Pokemon } from "@/types/pokemon";
import { useMemo, useState } from "react";

export const useSearchPokemons = (pokemons: Pokemon[]) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter Pokemon based on search term (case-insensitive)
  const filteredPokemons = useMemo<Pokemon[]>(() => {
    if (!searchTerm.trim()) {
      return pokemons || [];
    }

    return (
      pokemons.filter((pokemon: Pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    );
  }, [pokemons, searchTerm]);

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };
  return {
    searchTerm,
    filteredPokemons,
    handleSearch,

    pokemons: pokemons || [],
  };
};
