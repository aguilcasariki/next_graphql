import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Badge,
  HStack,
  Icon,
  Alert,
  AlertTitle,
  AlertDescription,
  Button,
} from "@chakra-ui/react";
import { MdAccessTime, MdCloud } from "react-icons/md";

// Component for empty state
export default function Empty({
  generatedAt,
  renderMethod,
}: {
  generatedAt: string;
  renderMethod: string;
}) {
  return (
    <Box minH="100vh" bg="gray.50" _dark={{ bg: "gray.900" }}>
      <Box bg="orange.600" _dark={{ bg: "orange.800" }} color="white" py={8}>
        <Container maxW="7xl">
          <VStack gap={4} textAlign="center">
            <Heading as="h1" size="2xl" fontWeight="bold">
              🎮 Pokédex
            </Heading>
            <Text fontSize="lg" opacity={0.9}>
              No hay Pokémon disponibles en este momento
            </Text>

            <HStack gap={4} flexWrap="wrap" justify="center">
              <Badge
                colorScheme="orange"
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

      <Container maxW="md" pt={8}>
        <Alert.Root status="warning" variant="subtle">
          <VStack gap={4} textAlign="center">
            <AlertTitle fontSize="lg">No hay Pokémon disponibles</AlertTitle>
            <AlertDescription>
              El servidor no devolvió ningún Pokémon. Esto puede ser temporal.
            </AlertDescription>
            <Button
              colorScheme="orange"
              variant="outline"
              onClick={() => window.location.reload()}
            >
              Actualizar página
            </Button>
          </VStack>
        </Alert.Root>
      </Container>
    </Box>
  );
}
