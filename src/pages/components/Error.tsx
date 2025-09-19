import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Alert,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

// Component for error state
export default function Error({
  error = { message: "Unknown error occurred", statusCode: 500 },
}: {
  error?: { message: string; statusCode: number };
}) {
  // Ensure error object has valid properties
  const errorMessage = error?.message || "Unknown error occurred";
  const statusCode = error?.statusCode || 500;

  return (
    <Box minH="100vh" bg="gray.50" _dark={{ bg: "gray.900" }}>
      <Box bg="red.600" _dark={{ bg: "red.800" }} color="white" py={8}>
        <Container maxW="7xl">
          <VStack gap={4} textAlign="center">
            <Heading as="h1" size="2xl" fontWeight="bold">
              🔥 Error en Pokédex
            </Heading>
            <Text fontSize="lg" opacity={0.9}>
              No se pudo cargar la información
            </Text>
          </VStack>
        </Container>
      </Box>

      <Container maxW="md" pt={8}>
        <Alert.Root status="error" variant="subtle">
          <VStack gap={4} textAlign="center">
            <AlertTitle fontSize="lg">¡Oops! Algo salió mal</AlertTitle>
            <AlertDescription>
              <VStack gap={2}>
                <Text>{errorMessage}</Text>
                <Text fontSize="sm" color="gray.500">
                  Código de error: {statusCode}
                </Text>
              </VStack>
            </AlertDescription>
            <HStack gap={4}>
              <Button
                colorScheme="red"
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Reintentar
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => (window.location.href = "/")}
              >
                Ir al inicio
              </Button>
            </HStack>
          </VStack>
        </Alert.Root>
      </Container>
    </Box>
  );
}
