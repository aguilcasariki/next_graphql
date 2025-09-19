import Head from "next/head";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Badge,
  HStack,
  Icon,
} from "@chakra-ui/react";
import {
  CombinedGraphQLErrors,
  ServerError,
  ServerParseError,
} from "@apollo/client/errors";
import { MdAccessTime, MdCloud } from "react-icons/md";
import { PokeGrid } from "@/components/PokeGrid";
import { GET_POKEMONS } from "@/graphql/queries";
import { Pokemon } from "@/types/pokemon";
import createApolloClient from "@/lib/apollo-client";
import Error from "./components/Error";
import Empty from "./components/Empty";

interface HomeProps {
  pokemons?: Pokemon[];
  generatedAt?: string;
  renderMethod?: string;
  error?: {
    message: string;
    statusCode: number;
  };
}

export default function Home({
  pokemons,
  generatedAt,
  renderMethod,
  error,
}: HomeProps) {
  // Handle error state
  if (error) {
    return <Error error={error} />;
  }

  // Handle empty state
  if (!pokemons || pokemons.length === 0) {
    return (
      <Empty
        generatedAt={generatedAt || new Date().toLocaleString("es-ES")}
        renderMethod={renderMethod || "Server-Side Rendering (SSR)"}
      />
    );
  }

  return (
    <>
      <Head>
        <title>Pokédex - GraphQL Next.js (SSR)</title>
        <meta
          name="description"
          content="Explora el mundo Pokémon con GraphQL usando Server-Side Rendering"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        minH="100vh"
        w={"100%"}
        bg="gray.50"
        _dark={{ bg: "gray.900" }}
        justifyContent={"center"}
      >
        {/* Header */}
        <Box
          bg="blue.600"
          _dark={{ bg: "blue.800" }}
          color="white"
          py={8}
          justifyContent={"center"}
        >
          <Container w={"100%"} maxW={"100%"}>
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

              {/* SSR Info Banner */}
              <HStack gap={4} flexWrap="wrap" justify="center">
                <Badge
                  colorScheme="green"
                  px={3}
                  py={1}
                  fontSize="sm"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Icon as={MdCloud} />
                  {renderMethod}
                </Badge>
                <Badge
                  colorScheme="blue"
                  px={3}
                  py={1}
                  fontSize="sm"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Icon as={MdAccessTime} />
                  Generado: {generatedAt}
                </Badge>
              </HStack>
            </VStack>
          </Container>
        </Box>

        {/* SSR Information Card */}
        <Container w={"100%"} pt={6} maxW={"100%"}>
          <Box
            bg="blue.50"
            _dark={{ bg: "blue.900" }}
            border="1px"
            borderColor="blue.200"
            borderRadius="lg"
            p={4}
            mb={6}
          >
            <VStack gap={2} textAlign="center">
              <Heading size="md" color="blue.600" _dark={{ color: "blue.300" }}>
                🚀 Server-Side Rendering (SSR)
              </Heading>
              <Text
                fontSize="sm"
                color="blue.700"
                _dark={{ color: "blue.200" }}
              >
                Esta página fue renderizada en el servidor el{" "}
                <strong>{generatedAt}</strong>
              </Text>
              <Text
                fontSize="xs"
                color="blue.600"
                _dark={{ color: "blue.300" }}
              >
                Los datos se obtienen dinámicamente en cada solicitud usando
                getServerSideProps
              </Text>

              {/* Success indicator */}
              <Badge colorScheme="green" variant="subtle">
                ✅ {pokemons.length} Pokémon cargados exitosamente
              </Badge>
            </VStack>
          </Box>
        </Container>

        {/* Main Content */}
        <Container maxW={"100%"} p={8}>
          <PokeGrid pokemons={pokemons} />
        </Container>
      </Box>
    </>
  );
}

export const getServerSideProps = async () => {
  // Generar timestamp en el servidor
  const generatedAt = new Date().toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });

  const client = createApolloClient();

  try {
    const { data } = await client.query({
      query: GET_POKEMONS,
      variables: {
        first: 10,
      },
      errorPolicy: "all",
    });

    // Handle case where no pokemons are returned
    if (!data?.pokemons || data.pokemons.length === 0) {
      return {
        props: {
          pokemons: [],
          generatedAt,
          renderMethod: "Server-Side Rendering (SSR)",
        },
      };
    }

    return {
      props: {
        pokemons: (data as { pokemons: Pokemon[] }).pokemons,
        generatedAt,
        renderMethod: "Server-Side Rendering (SSR)",
      },
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

    // Return error information instead of empty array
    return {
      props: {
        error: {
          message: "Error interno del servidor al cargar los Pokémon.",
          statusCode: 500,
        },
        generatedAt,
        renderMethod: "Server-Side Rendering (SSR) - Error",
      },
    };
  }
};
