import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import FullNamePage from "./pages/FullNamePage";
import BirthDatePage from "./pages/BirthDatePage";
import PokemonListPage from "./pages/PokemonListPage";
import PokemonDetails from "./pages/PokemonDetails";
import { ColorModeScript } from "@chakra-ui/color-mode";

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FullNamePage />} />
          <Route path="/birthdate" element={<BirthDatePage />} />
          <Route path="/pokemons" element={<PokemonListPage limit={12} />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </Router>
      <ColorModeScript initialColorMode="dark" />
    </ChakraProvider>
  );
};

export default App;
