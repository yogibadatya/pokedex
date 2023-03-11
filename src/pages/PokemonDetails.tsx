import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Flex, Box, Image, Text, Spinner, Divider } from "@chakra-ui/react";
import { getPokemonByName } from "../api";

const PokemonDetailsPage = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemonDetails, setPokemonDetails] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const fullNameFromLocalStorage = localStorage.getItem("fullName");
  const birthDateFromLocalStorage = localStorage.getItem("birthDate");

  useEffect(() => {
    if (!fullNameFromLocalStorage || !birthDateFromLocalStorage) {
      navigate("/", { replace: true });
    }
  });

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (name) {
        const data = await getPokemonByName(name);
        const pokemonDetails = {
          name: data.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
          height: data.height,
          weight: data.weight,
          types: data.types.map(
            (type: { type: { name: string } }) => type.type.name
          ),
        };
        setPokemonDetails(pokemonDetails);
        setIsLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!pokemonDetails) {
    return <Box>Error: Pokemon not found</Box>;
  }

  return (
    <Flex direction="column" align="center" py="4">
      <Box
        w="300px"
        h="400px"
        borderRadius="lg"
        boxShadow="md"
        overflow="hidden"
        mb="4"
        border={"solid"}
        borderColor={"blue"}
      >
        <Image
          src={pokemonDetails?.image}
          alt={pokemonDetails?.name}
          w="100%"
          h="60%"
          objectFit="cover"
        />
        <Divider />
        <Text fontWeight="bold" fontSize="2xl" ml="3" mb="2">
          {pokemonDetails?.name}
        </Text>
        <Text fontWeight="bold" ml="3" mb="2">
          Height: {pokemonDetails?.height / 10}m
        </Text>
        <Text fontWeight="bold" ml="3" mb="2">
          Weight: {pokemonDetails?.weight / 10}kg
        </Text>
        <Text fontWeight="bold" ml="3" mb="2">
          Types: {pokemonDetails?.types.join(", ")}
        </Text>
      </Box>
    </Flex>
  );
};
export default PokemonDetailsPage;
