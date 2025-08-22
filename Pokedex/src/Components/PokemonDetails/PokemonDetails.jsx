import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import usePokemonList from "../../Hooks/usePokemonList";

export default function PokemonDetails() {
  const [pokemon, setPokemon] = useState(null);
  const { id } = useParams();

  async function downloadPokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      types: response.data.types.map((t) => t.type.name),
    });
  }

  //more same type pokemon
  const { pokemonListState } = usePokemonList(
    `https://pokeapi.co/api/v2/type/${pokemon.types ? pokemon.types[0] : 'fire' }`,
    true
  );

  useEffect(() => {
    downloadPokemon();
    console.log("list :  ", pokemonListState);
  }, [id]);

  if (!pokemon) {
    return (
      <div className="h-screen flex justify-center items-center text-white text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-black via-purple-600 to-pink-600 flex flex-col justify-center items-center font-[Poppins] text-white overflow-hidden">
      {/* Title */}
      <h1 className="text-5xl font-extralight text-black tracking-[8px]  drop-shadow-lg mb-4">
        Pokedex
      </h1>
      <hr className="w-2/3 h-0.5 bg-black rounded mb-6 border-0" />

      {/* Card */}
      <div className="bg-white text-black rounded-3xl shadow-xl p-8 flex flex-col items-center w-[350px]">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-40 h-40 object-contain mb-4"
        />
        <h2 className="text-2xl capitalize font-bold mb-2">{pokemon.name}</h2>
        <p className="text-lg font-medium mb-2">Weight: {pokemon.weight}</p>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {pokemon.types.map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-purple-200 text-purple-800 font-semibold rounded-full capitalize"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Back Button */}
        <Link
          to="/"
          className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition"
        >
          🔙 Back
        </Link>

        {pokemon.types && (
          <div>
            More {pokemon.type[0]} type pokemon
            <ul>
              {pokemonListState.pokemonList &&
                pokemonListState.pokemonList.map((p) => (
                  <li key={p.pokemon.url}>{p.pokemon.name}</li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
