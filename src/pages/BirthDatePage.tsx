import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const BirthDatePage = () => {
  const navigate = useNavigate();
  const [birthDate, setBirthDate] = useState("");

  useEffect(() => {
    const fullNameFromLocalStorage = localStorage.getItem("fullName");
    if (!fullNameFromLocalStorage) {
      navigate("/", { replace: true });
    }
  });

  const handleBirthDateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem("birthDate", birthDate);
    navigate("/pokemons", { replace: true });
  };

  const handleBirthDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBirthDate(event.target.value);
  };

  return (
    <Flex direction="column" align="center" py="4">
      <Box
        w="300px"
        h="200px"
        borderRadius="lg"
        boxShadow="md"
        overflow="hidden"
        mb="4"
        border={"solid"}
        borderColor={"blue"}
      >
        <form onSubmit={handleBirthDateSubmit}>
          <FormControl id="birth-date" isRequired>
            <FormLabel>Birth Date</FormLabel>
            <Divider />
            <Input
              mt={4}
              mb={4}
              type="date"
              value={birthDate}
              onChange={handleBirthDateChange}
            />
            <Divider />
            <Button mt={2} type="submit">
              Submit
            </Button>
          </FormControl>
        </form>
      </Box>
    </Flex>
  );
};

export default BirthDatePage;
