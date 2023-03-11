import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Divider,
} from "@chakra-ui/react";

const FullNamePage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");

  const handleFullNameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem("fullName", fullName);
    navigate("/birthdate", { replace: true });
  };

  const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
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
        <form onSubmit={handleFullNameSubmit}>
          <FormControl id="full-name" isRequired>
            <FormLabel>Full Name</FormLabel>
            <Divider />
            <Input
              mt={4}
              mb={4}
              type="text"
              placeholder="Enter Your Name"
              value={fullName}
              onChange={handleFullNameChange}
            />
            <Divider />
            <Button mt={2} type="submit">
              Next
            </Button>
          </FormControl>
        </form>
      </Box>
    </Flex>
  );
};

export default FullNamePage;
