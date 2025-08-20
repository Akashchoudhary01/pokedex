import axios from "axios";
import { useState , useEffect } from "react";
export default function usePokemonList(){

      const [pokemonListState, setpokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        POKEDEX_URL: `https://pokeapi.co/api/v2/pokemon`,
        nextUrl: "",
        prevUrl: "",
      });

        async function downlodePokemon() {
    setpokemonListState((prev) => ({ ...prev, isLoading: true }));

    const response = await axios.get(pokemonListState.POKEDEX_URL); // ✅ fixed
    const pokemonResult = response.data.results;

    setpokemonListState((prev) => ({
      ...prev,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));

    const pokemonResultPromish = pokemonResult.map((pokemon) =>
      axios.get(pokemon.url)
    );

    const pokemonData = await axios.all(pokemonResultPromish);

    const PokelistResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other["official-artwork"].front_default,
        types: pokemon.types,
      };
    });

    setpokemonListState((prev) => ({
      ...prev,
      pokemonList: PokelistResult,
      isLoading: false,
    }));
  }

  useEffect(() => {
    downlodePokemon();
    // eslint-disable-next-line
  }, [pokemonListState.POKEDEX_URL]);

  return {pokemonListState , setpokemonListState}
}