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
  Alert,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { GET_POKEMON, GET_POKEMONS } from "@/graphql/queries";
import createApolloClient from "@/lib/apollo-client";
import { PokemonDetail } from "@/types/pokemon";
import { CombinedGraphQLErrors } from "@apollo/client";
import { ServerError } from "@apollo/client";
import { ServerParseError } from "@apollo/client";
import Error from "./components/Error";

interface PokemonPageProps {
  pokemon?: PokemonDetail;
  generatedAt?: string;
  error?: {
    message: string;
    statusCode: number;
  };
}

export default function PokemonPage({
  pokemon,
  generatedAt,
  error,
}: PokemonPageProps) {
  // Handle error state
  if (error) {
    return <Error error={error} />;
  }

  // Handle not found (this shouldn't happen due to getStaticProps logic, but good to have)
  if (!pokemon) {
    return (
      <Center h="100vh" bg="gray.50" _dark={{ bg: "gray.900" }}>
        <Container maxW={"100%"}>
          <Alert.Root status="warning" variant="subtle">
            <VStack gap={4} textAlign="center">
              <AlertTitle fontSize="lg">Pokémon no encontrado</AlertTitle>
              <AlertDescription>
                El Pokémon que buscas no existe o no está disponible.
              </AlertDescription>
              <Link href="/">
                <Button colorScheme="blue">Volver al inicio</Button>
              </Link>
            </VStack>
          </Alert.Root>
        </Container>
      </Center>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
  };

  return (
    <>
      <Head>
        <title>{`${pokemon.name} - Pokédex`}</title>
        <meta
          name="description"
          content={`Información detallada sobre ${pokemon.name}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box minH="100vh" bg="gray.50" _dark={{ bg: "gray.900" }}>
        {/* ISR Indicator */}
        <Alert.Root status="info" variant="subtle">
          <Box justifyContent={"center"} p={8}>
            <AlertTitle>Página generada con ISR!</AlertTitle>
            <AlertDescription>
              Esta página fue generada el {formatDate(generatedAt!)} y se
              regenera cada 20 segundos.
            </AlertDescription>
          </Box>
        </Alert.Root>

        {/* Header */}
        <Box bg="blue.600" _dark={{ bg: "blue.800" }} color="white" py={6}>
          <Container maxW={"100%"} p={8}>
            <VStack gap={4}>
              <HStack w="full" justify="space-between" align="center">
                <Link href="/">
                  <Button
                    variant="outline"
                    p={2}
                    colorScheme="whiteAlpha"
                    size="sm"
                  >
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
        <Container maxW={"100%"} p={8}>
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
                        onError={(e) => {
                          console.error("Error loading image:", e);
                        }}
                      />
                    </Box>

                    <VStack gap={4} w="full">
                      <Box textAlign="center">
                        <Text fontSize="lg" fontWeight="semibold" mb={2}>
                          Tipos
                        </Text>
                        <HStack justify="center" gap={2}>
                          {pokemon.types?.map((typeInfo, index) => (
                            <Badge
                              key={index}
                              fontSize="md"
                              px={4}
                              py={2}
                              borderRadius="full"
                              textTransform="capitalize"
                              colorScheme="purple"
                            >
                              {typeInfo}
                            </Badge>
                          )) || <Text color="gray.500">No disponible</Text>}
                        </HStack>
                      </Box>
                    </VStack>

                    <VStack>
                      <Box textAlign="center" gap={2}>
                        <Text fontSize="lg" fontWeight="semibold" mb={2}>
                          Clasificación
                        </Text>
                        <HStack justify="center" gap={2}>
                          <Badge
                            colorScheme="blue"
                            fontSize="md"
                            px={4}
                            py={2}
                            borderRadius={"full"}
                          >
                            {pokemon.classification || "No disponible"}
                          </Badge>
                        </HStack>
                      </Box>
                    </VStack>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </GridItem>

            {/* Additional Pokemon Details */}
            <GridItem>
              <Card.Root bg="white" _dark={{ bg: "gray.800" }} shadow="lg">
                <Card.Body p={8}>
                  <VStack gap={6} align="stretch">
                    <Heading size="lg" textAlign="center">
                      Información Adicional
                    </Heading>

                    <Box
                      p={4}
                      bg="gray.50"
                      _dark={{ bg: "gray.700" }}
                      borderRadius="lg"
                    >
                      <Text
                        fontSize="sm"
                        color="gray.600"
                        _dark={{ color: "gray.400" }}
                        mb={2}
                      >
                        Página generada con ISR
                      </Text>
                      <Text
                        fontSize="xs"
                        color="gray.500"
                        _dark={{ color: "gray.500" }}
                      >
                        Última generación: {formatDate(generatedAt!)}
                      </Text>
                      <Text
                        fontSize="xs"
                        color="gray.500"
                        _dark={{ color: "gray.500" }}
                      >
                        Se regenera automáticamente cada 20 segundos
                      </Text>
                    </Box>

                    <Box textAlign="center">
                      <Text fontSize="lg" fontWeight="semibold" mb={4}>
                        ID del Pokémon
                      </Text>
                      <Badge
                        colorScheme="gray"
                        fontSize="lg"
                        px={6}
                        py={3}
                        borderRadius="full"
                      >
                        #{pokemon.id}
                      </Badge>
                    </Box>
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
  try {
    const client = createApolloClient();
    const { data } = await client.query({
      query: GET_POKEMONS,
      variables: {
        first: 10,
      },
    });

    return {
      paths: (data as { pokemons: { id: string }[] }).pokemons.map(
        (pokemon) => ({
          params: { id: pokemon.id },
        })
      ),
      fallback: "blocking", // Enables loading state for new pages
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);

    // Return empty paths and enable fallback to handle all routes dynamically
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps = async (context: { params: { id: string } }) => {
  const { id } = context.params;
  const client = createApolloClient();

  try {
    const { data } = await client.query({
      query: GET_POKEMON,
      variables: {
        id: id,
      },
      errorPolicy: "all",
    });

    // Handle case where Pokemon is not found
    if (!data?.pokemon) {
      return {
        props: {
          error: {
            message: "El Pokémon solicitado no fue encontrado.",
            statusCode: 404,
          },
        },
        revalidate: 20,
      };
    }

    return {
      props: {
        pokemon: data.pokemon,
        generatedAt: new Date().toISOString(),
      },
      revalidate: 20,
    };
  } catch (error: unknown) {
    console.error("Error fetching pokemons:", error);
    if (CombinedGraphQLErrors.is(error)) {
      // Errores de GraphQL (validación, resolución, etc.)
      console.error("GraphQL Errors:", error.errors);
    } else if (ServerError.is(error)) {
      // Errores del servidor (status HTTP 4xx/5xx)
      console.error("Server Error:", error.statusCode, error.bodyText);
    } else if (ServerParseError.is(error)) {
      // Errores de parseo JSON
      console.error("Parse Error:", error.message);
    } else {
      // Errores genéricos o no especificados
      console.error("Unknown Error:", error);
    }

    // Return error information instead of notFound
    return {
      props: {
        error: {
          message: "Error interno del servidor al cargar el Pokémon.",
          statusCode: 500,
        },
      },
      revalidate: 20, // Still allow revalidation for recovery
    };
  }
};
