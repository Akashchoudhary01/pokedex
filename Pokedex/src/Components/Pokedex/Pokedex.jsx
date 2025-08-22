import React, { useState } from 'react'
import Search from '../Search/Search'
import PokemonList from '../PokemonList/PokemonList'

export default function Pokedex() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <h1 className="text-center text-5xl font-[Poppins] tracking-[10px] bg-black bg-clip-text text-transparent drop-shadow-lg m-8">
        Pokedex
      </h1>

      {/* Search box */}
      <Search updateSearchTerm={setSearchTerm} />

      {/* Pokémon list (filtered) */}
      <PokemonList searchTerm={searchTerm} />
    </div>
  );
}
