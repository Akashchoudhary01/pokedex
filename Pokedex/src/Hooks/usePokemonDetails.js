import axios from "axios";
import { useEffect, useState } from "react";

export default function usePokemonDetails(id) {
  const [pokemon, setPokemon] = useState(null);

  async function downloadPokemon() {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemon({
        name: response.data.name,
        image: response.data.sprites.other.dream_world.front_default,
        weight: response.data.weight,
        types: response.data.types.map((t) => t.type.name),
      });
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  }

  useEffect(() => {
    if (id) downloadPokemon();
  }, [id]);

  return pokemon;
}
