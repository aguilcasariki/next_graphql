import { useSearchPokemons } from "@/hooks/useSearchPokemons";
import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import { SearchBar } from "@/components/SearchBar";
import Link from "next/link";
import { Box, SimpleGrid, Text, Badge, VStack, Center } from "@chakra-ui/react";

export const PokeGrid = ({ pokemons }: { pokemons: Pokemon[] }) => {
  const { searchTerm, filteredPokemons, handleSearch } =
    useSearchPokemons(pokemons);
  return (
    <VStack gap={8}>
      {/* Search Bar */}
      <Box textAlign="center">
        <SearchBar onSearch={handleSearch} />
      </Box>

      <Box textAlign="center">
        <Badge
          colorScheme="blue"
          fontSize="md"
          px={3}
          py={1}
          borderRadius="full"
        >
          {filteredPokemons.length} Pokémon encontrados
          {searchTerm && ` (filtrado de ${pokemons.length})`}
        </Badge>
      </Box>

      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        gap={6}
        w="full"
      >
        {filteredPokemons.map((pokemon) => (
          <Link key={pokemon.id} href={`/pokemon/${pokemon.id}`}>
            <Box
              as="article"
              bg="white"
              _dark={{ bg: "gray.800", borderColor: "gray.600" }}
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="lg"
              p={4}
              shadow="sm"
              _hover={{
                transform: "translateY(-4px)",
                shadow: "lg",
                cursor: "pointer",
              }}
              transition="all 0.2s"
            >
              <VStack gap={3}>
                <Box
                  position="relative"
                  w="100px"
                  h="100px"
                  bg="gray.50"
                  _dark={{ bg: "gray.700", borderColor: "gray.500" }}
                  borderRadius="full"
                  overflow="hidden"
                  border="3px solid"
                  borderColor="gray.200"
                >
                  <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
                <VStack gap={1} textAlign="center">
                  <Text
                    fontWeight="bold"
                    fontSize="lg"
                    color="gray.700"
                    _dark={{ color: "gray.200" }}
                    textTransform="capitalize"
                  >
                    {pokemon.name}
                  </Text>
                  <Text
                    fontSize="sm"
                    color="gray.500"
                    _dark={{ color: "gray.400" }}
                  >
                    #{pokemon.id.padStart(3, "0")}
                  </Text>
                </VStack>
              </VStack>
            </Box>
          </Link>
        ))}
      </SimpleGrid>

      {filteredPokemons.length === 0 && (
        <Center py={16}>
          <VStack gap={4} textAlign="center">
            <Text fontSize="2xl" color="gray.500">
              🔍
            </Text>
            <Text fontSize="lg" color="gray.600" _dark={{ color: "gray.400" }}>
              {searchTerm
                ? `No se encontraron Pokémon que coincidan con "${searchTerm}"`
                : "No se encontraron Pokémon"}
            </Text>
          </VStack>
        </Center>
      )}
    </VStack>
  );
};
