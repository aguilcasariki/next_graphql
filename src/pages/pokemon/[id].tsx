import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Container,
  Heading,
  Text,
  Badge,
  VStack,
  HStack,
  Button,
  Card,
  Grid,
  GridItem,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { GET_POKEMON, GET_POKEMONS } from "@/graphql/queries";
import createApolloClient from "@/lib/apollo-client";

interface Pokemon {
  id: string;
  name: string;
  image: string;
  classification: string;
  types: string[];
}

interface PokemonPageProps {
  pokemon: Pokemon;
}

export default function PokemonPage({ pokemon }: PokemonPageProps) {
  if (!pokemon) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return (
    <>
      <Head>
        <title>{pokemon.name} - Pokédex</title>
        <meta
          name="description"
          content={`Información detallada sobre ${pokemon.name}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box minH="100vh" bg="gray.50" _dark={{ bg: "gray.900" }}>
        {/* Header */}
        <Box bg="blue.600" _dark={{ bg: "blue.800" }} color="white" py={6}>
          <Container maxW="7xl">
            <VStack gap={4}>
              <HStack w="full" justify="space-between" align="center">
                <Link href="/">
                  <Button variant="outline" colorScheme="whiteAlpha" size="sm">
                    ← Volver
                  </Button>
                </Link>
                <Badge
                  colorScheme="whiteAlpha"
                  fontSize="sm"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  #{pokemon.id.padStart(3, "0")}
                </Badge>
              </HStack>
              <Heading
                as="h1"
                size="2xl"
                color={"white"}
                textAlign="center"
                textTransform="capitalize"
              >
                {pokemon.name}
              </Heading>
            </VStack>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxW="6xl" py={8}>
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
            {/* Pokemon Image and Basic Info */}
            <GridItem>
              <Card.Root bg="white" _dark={{ bg: "gray.800" }} shadow="lg">
                <Card.Body p={8}>
                  <VStack gap={6}>
                    <Box
                      position="relative"
                      w="250px"
                      h="250px"
                      bg="gray.50"
                      _dark={{ bg: "gray.700", borderColor: "gray.600" }}
                      borderRadius="2xl"
                      overflow="hidden"
                      border="4px solid"
                      borderColor="gray.200"
                      mx="auto"
                    >
                      <Image
                        src={pokemon.image}
                        alt={pokemon.name}
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                      />
                    </Box>

                    <VStack gap={4} w="full">
                      <Box textAlign="center">
                        <Text fontSize="lg" fontWeight="semibold" mb={2}>
                          Tipos
                        </Text>
                        <HStack justify="center" gap={2}>
                          {pokemon.types.map((typeInfo, index) => (
                            <Badge
                              key={index}
                              fontSize="md"
                              px={4}
                              py={2}
                              borderRadius="full"
                              textTransform="capitalize"
                            >
                              {typeInfo}
                            </Badge>
                          ))}
                        </HStack>
                      </Box>
                    </VStack>

                    <VStack>
                      <Box textAlign="center" gap={2}>
                        <Text fontSize="lg" fontWeight="semibold" mb={2}>
                          Clasificacion
                        </Text>
                        <HStack justify="center" gap={2}>
                          <Badge
                            colorScheme="blue"
                            fontSize="md"
                            px={4}
                            py={2}
                            borderRadius={"full"}
                          >
                            {pokemon.classification}
                          </Badge>
                        </HStack>
                      </Box>
                    </VStack>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export const getStaticPaths = async () => {
  const client = createApolloClient();
  const { data } = await client.query({
    query: GET_POKEMONS,
    variables: {
      first: 10,
    },
  });

  return {
    paths: (data as { pokemons: { id: string }[] }).pokemons.map((pokemon) => ({
      params: { id: pokemon.id },
    })),
    fallback: false,
  };
};

export const getStaticProps = async (context: { params: { id: string } }) => {
  const { id } = context.params;
  const client = createApolloClient();
  const { data } = await client.query({
    query: GET_POKEMON,
    variables: {
      id: id,
    },
  });

  console.log(data);

  return {
    props: {
      pokemon: (data as { pokemon: Pokemon }).pokemon,
    },
  };
};
