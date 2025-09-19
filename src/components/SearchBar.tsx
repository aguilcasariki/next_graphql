import React, { useState, useEffect } from "react";
import { Input, Box } from "@chakra-ui/react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Buscar Pokémon...",
  debounceMs = 300,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch, debounceMs]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box maxW="md" w="full" position="relative">
      <Box
        position="absolute"
        left="3"
        top="50%"
        transform="translateY(-50%)"
        zIndex="1"
        color="gray.400"
        fontSize="lg"
      >
        🔍
      </Box>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        bg="white"
        _dark={{ bg: "gray.800", borderColor: "gray.600" }}
        borderWidth="2px"
        borderColor="gray.200"
        borderRadius="full"
        _hover={{
          borderColor: "blue.300",
        }}
        _focus={{
          borderColor: "blue.500",
          boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
        }}
        fontSize="md"
        pl="40px"
        size="lg"
      />
    </Box>
  );
};
