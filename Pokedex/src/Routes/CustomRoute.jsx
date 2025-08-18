import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Pokedex from '../Components/Pokedex/Pokedex'
import PokemonDetails from '../Components/PokemonDetails/PokemonDetails'

export default function CustomRoute() {
  return (
    <div>
        <Routes>

        <Route path='/' element={<Pokedex/>}/>
        <Route path='/pokemon/:id' element={<PokemonDetails/>}></Route>
        
        </Routes>
      
    </div>
  )
}
