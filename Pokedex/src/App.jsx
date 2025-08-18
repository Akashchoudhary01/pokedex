import React from 'react'
import Pokedex from './Components/Pokedex/Pokedex'
import PokemonList from './Components/PokemonList/PokemonList'

export default function App() {
  return (
    <div className="h-full bg-gradient-to-r from-black via-purple-500 to-pink-600 flex flex-col  justify-top ">
      <Pokedex />
      <PokemonList/>
     
      
       </div>
  )
}
