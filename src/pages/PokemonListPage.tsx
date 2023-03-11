import { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Image,
  Text,
  Input,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { getPokemons } from "../api";

interface PokemonListProps {
  limit: number;
}

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

const PokemonListPage = ({ limit }: PokemonListProps) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const navigate = useNavigate();
  const fullNameFromLocalStorage = localStorage.getItem("fullName");
  const birthDateFromLocalStorage = localStorage.getItem("birthDate");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handlePrevPage = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  useEffect(() => {
    if (!fullNameFromLocalStorage || !birthDateFromLocalStorage) {
      navigate("/", { replace: true });
    }
  });

  useEffect(() => {
    const fetchPokemons = async () => {
      const offset = (currentPage - 1) * limit;
      const data = await getPokemons(limit, offset);
      const pokemonList = data.results.map((pokemon: any) => ({
        id: pokemon.url.split("/")[6],
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          pokemon.url.split("/")[6]
        }.png`,
      }));
      setPokemons(pokemonList);
      setTotalPages(Math.ceil(data.count / limit));
    };

    fetchPokemons();
  }, [limit, currentPage]);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Flex direction="column" align="center" py="4">
      <Box w="100%">
        <Input
          placeholder="Search for a Pokemon"
          value={search}
          onChange={handleSearchChange}
          id="search-pokemon"
          htmlSize={20}
          width="auto"
        />
      </Box>
      <Box
        w="100%"
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        mt="4"
      >
        {filteredPokemons.map((pokemon) => (
          <Link to={`/pokemon/${pokemon.name}`} key={pokemon.id}>
            <Box
              w="150px"
              h="250px"
              m="2"
              borderRadius="lg"
              boxShadow="md"
              overflow="hidden"
              cursor="pointer"
              border={"solid"}
              borderColor={"blue"}
            >
              <Image src={pokemon.image} alt={pokemon.name} w="100%" h="80%" />
              <Divider />
              <Text textAlign="center" fontWeight="bold" mt="2">
                {pokemon.name}
              </Text>
            </Box>
          </Link>
        ))}
      </Box>
      <Flex justify="center" mt="4">
        <Button
          colorScheme="blue"
          isDisabled={currentPage === 1}
          onClick={handlePrevPage}
          mr="2"
        >
          Prev
        </Button>
        <Text>{`${currentPage} / ${totalPages}`}</Text>
        <Button
          colorScheme="blue"
          isDisabled={currentPage === totalPages}
          onClick={handleNextPage}
          ml="2"
        >
          Next
        </Button>
      </Flex>
    </Flex>
  );
};

export default PokemonListPage;
