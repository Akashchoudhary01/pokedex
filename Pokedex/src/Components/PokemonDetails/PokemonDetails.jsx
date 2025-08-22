import React from "react";
import { useParams, Link } from "react-router-dom";
import usePokemonDetails from "../../Hooks/usePokemonDetails";
import usePokemonList from "../../Hooks/usePokemonList";

export default function PokemonDetails() {
  const { id } = useParams();
  const pokemon = usePokemonDetails(id);

  const { pokemonListState } = usePokemonList(
    pokemon?.types ? `https://pokeapi.co/api/v2/type/${pokemon.types[0]}` : null,
    true
  );

  if (!pokemon) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-black via-purple-600 to-pink-600 flex flex-col items-center font-[Poppins] text-white pb-20">
      {/* Title */}
      <h1 className="text-5xl font-extralight text-black tracking-[8px] drop-shadow-lg mt-10 mb-4">
        Pokedex
      </h1>
      <hr className="w-2/3 h-0.5 bg-black rounded mb-6 border-0" />

      {/* Card */}
      <div className="bg-white text-black rounded-3xl shadow-xl p-8 flex flex-col items-center w-[350px] mb-10">
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

        {/* More Pokémons of same type */}
        {pokemon.types && (
          <div className="mt-6 text-center">
            <h3 className="font-bold mb-2">
              More {pokemon.types[0]} type Pokémon:
            </h3>
            <ul className="space-y-1">
              {pokemonListState.pokemonList &&
                pokemonListState.pokemonList.map((p) => (
                  <li key={p.pokemon.name} className="capitalize">
                    {p.pokemon.name}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
