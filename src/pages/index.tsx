import Head from "next/head";
import Image from "next/image";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Badge,
  VStack,
  Center,
  Spinner,
} from "@chakra-ui/react";
import createApolloClient from "@/lib/apollo-client";
import { GET_POKEMONS } from "@/graphql/queries";
import Link from "next/link";

interface Pokemon {
  id: string;
  name: string;
  image: string;
  types?: string[];
}

interface HomeProps {
  pokemons: Pokemon[];
}

export default function Home({ pokemons }: HomeProps) {
  if (!pokemons) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return (
    <>
      <Head>
        <title>Pokédex - GraphQL Next.js</title>
        <meta
          name="description"
          content="Explora el mundo Pokémon con GraphQL"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box minH="100vh" bg="gray.50" _dark={{ bg: "gray.900" }}>
        {/* Header */}
        <Box bg="blue.600" _dark={{ bg: "blue.800" }} color="white" py={8}>
          <Container maxW="7xl">
            <VStack gap={4} textAlign="center">
              <Heading
                as="h1"
                size="2xl"
                fontWeight="bold"
                bgGradient="linear(to-r, yellow.400, red.400)"
                bgClip="text"
                _dark={{ bgGradient: "linear(to-r, yellow.300, red.300)" }}
              >
                🎮 Pokédex
              </Heading>
              <Text fontSize="lg" opacity={0.9}>
                Descubre y explora el increíble mundo Pokémon
              </Text>
            </VStack>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxW="7xl" py={8}>
          <VStack gap={8}>
            <Box textAlign="center">
              <Badge
                colorScheme="blue"
                fontSize="md"
                px={3}
                py={1}
                borderRadius="full"
              >
                {pokemons.length} Pokémon encontrados
              </Badge>
            </Box>

            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
              gap={6}
              w="full"
            >
              {pokemons.map((pokemon) => (
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

            {pokemons.length === 0 && (
              <Center py={16}>
                <VStack gap={4} textAlign="center">
                  <Text fontSize="2xl" color="gray.500">
                    🔍
                  </Text>
                  <Text
                    fontSize="lg"
                    color="gray.600"
                    _dark={{ color: "gray.400" }}
                  >
                    No se encontraron Pokémon
                  </Text>
                </VStack>
              </Center>
            )}
          </VStack>
        </Container>
      </Box>
    </>
  );
}

export const getServerSideProps = async () => {
  const client = createApolloClient();
  const { data } = await client.query({
    query: GET_POKEMONS,
    variables: {
      first: 10,
    },
  });

  console.log(data);

  return {
    props: {
      pokemons: (data as { pokemons: Pokemon[] }).pokemons,
    },
  };
};
