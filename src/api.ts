import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/';

export const getPokemons = async (limit: number, offset: number) => {
  const url = `${BASE_URL}pokemon?limit=${limit}&offset=${offset}`;
  const response = await axios.get(url);
  return response.data;
};

export const getPokemonByName = async (name: string) => {
  const url = `${BASE_URL}pokemon/${name}`;
  const response = await axios.get(url);
  return response.data;
};
