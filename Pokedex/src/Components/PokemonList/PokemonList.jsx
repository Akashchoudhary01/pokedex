import React, { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function downlodePokemon() {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const pokemonResult = response.data.results;
    const pokemonResultPromish = pokemonResult.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemonData = await axios.all(pokemonResultPromish);
    // console.log(pokemonData);

    //setPokemon data
    
    const res =  pokemonData.map((pokeData) => {
        const pokemon = pokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
           image:
            pokemon.sprites.other["official-artwork"].front_default,
          types: pokemon.types
        };
      })
      setPokemonList(res);
      console.log(res);
      
  

    setIsLoading(false);
  }

  useEffect(() => {
    downlodePokemon();
  }, []);

  return (
    <div className="flex-wrap justify-center gap-6 mx-auto mt-10 p-6  flex  font-poppins">
      {isLoading ? "Loading ....." :
      pokemonList.map((p) => <Pokemon name={p.name} key={p.id} image={p.image}/>)
      
      }
    </div>
  );
}
