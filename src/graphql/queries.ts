import { gql, TypedDocumentNode } from "@apollo/client";
import {
  GetPokemonsResponse,
  GetPokemonsVariables,
  GetPokemonResponse,
  GetPokemonVariables,
} from "@/types/pokemon";

export const GET_POKEMONS: TypedDocumentNode<
  GetPokemonsResponse,
  GetPokemonsVariables
> = gql`
  query GetPokemons($first: Int!) {
    pokemons(first: $first) {
      id
      image
      name
    }
  }
`;

export const GET_POKEMON: TypedDocumentNode<
  GetPokemonResponse,
  GetPokemonVariables
> = gql`
  query GetPokemon($id: String!) {
    pokemon(id: $id) {
      id
      name
      number
      image
      classification
      types
    }
  }
`;
