// Base Pokemon interface for listing
export interface Pokemon {
  id: string;
  name: string;
  image: string;
}

// Extended Pokemon interface for detailed view
export interface PokemonDetail extends Pokemon {
  number: number;
  classification: string;
  types: string[];
}

// GraphQL response types
export interface GetPokemonsResponse {
  pokemons: Pokemon[];
}

export interface GetPokemonResponse {
  pokemon: PokemonDetail;
}

// Query variables types
export interface GetPokemonsVariables {
  first: number;
}

export interface GetPokemonVariables {
  id: string;
}
