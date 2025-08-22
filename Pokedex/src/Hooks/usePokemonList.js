import axios from "axios";
import { useState, useEffect } from "react";

export default function usePokemonList(url, type = false) {
  const [pokemonListState, setpokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    POKEDEX_URL: url,
    nextUrl: "",
    prevUrl: "",
  });

  async function downloadPokemon() {
    if (!pokemonListState.POKEDEX_URL) return;

    setpokemonListState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await axios.get(pokemonListState.POKEDEX_URL);

      if (type) {
        setpokemonListState((prev) => ({
          ...prev,
          pokemonList: response.data.pokemon.slice(0, 5),
          isLoading: false,
        }));
      } else {
        const pokemonResult = response.data.results;

        const promises = pokemonResult.map((p) => axios.get(p.url));
        const responses = await axios.all(promises);

        const PokelistResult = responses.map((res) => {
          const pokemon = res.data;
          return {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.other["official-artwork"].front_default,
            types: pokemon.types.map((t) => t.type.name),
          };
        });

        setpokemonListState((prev) => ({
          ...prev,
          nextUrl: response.data.next,
          prevUrl: response.data.previous,
          pokemonList: PokelistResult,
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error("Error fetching Pokémon list:", error);
      setpokemonListState((prev) => ({ ...prev, isLoading: false }));
    }
  }

  useEffect(() => {
    setpokemonListState((prev) => ({ ...prev, POKEDEX_URL: url }));
  }, [url]);

  useEffect(() => {
    downloadPokemon();
    // eslint-disable-next-line
  }, [pokemonListState.POKEDEX_URL]);

  return { pokemonListState, setpokemonListState };
}
