import {
  Container,
  Text,
  VStack,
  HStack,
  Button,
  Center,
  Alert,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import Link from "next/link";

// Component for error state
export default function Error({
  error,
}: {
  error?: { message: string; statusCode: number };
}) {
  // Provide default values if error is undefined
  const errorMessage = error?.message || "Ha ocurrido un error inesperado";
  const errorStatusCode = error?.statusCode || 500;

  return (
    <Center h="100vh" bg="gray.50" _dark={{ bg: "gray.900" }}>
      <Container maxW="md">
        <Alert.Root status="error" variant="subtle">
          <VStack gap={4} textAlign="center">
            <AlertTitle fontSize="lg">¡Oops! Algo salió mal</AlertTitle>
            <AlertDescription>
              <VStack gap={2}>
                <Text>{errorMessage}</Text>
                <Text fontSize="sm" color="gray.500">
                  Código de error: {errorStatusCode}
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
              <Link href="/">
                <Button colorScheme="blue">Volver al inicio</Button>
              </Link>
            </HStack>
          </VStack>
        </Alert.Root>
      </Container>
    </Center>
  );
}
