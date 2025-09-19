import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query Myquery($first: Int!) {
    pokemons(first: $first) {
      id
      image
      name
    }
  }
`;

export const GET_POKEMON = gql`
  query Myquery($id: String) {
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
