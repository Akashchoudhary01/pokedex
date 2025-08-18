import React, { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [ POKEDEX_URL , setPOKEDEX_URL] = useState("https://pokeapi.co/api/v2/pokemon");

  const [nextUrl , setNextUrl] = useState('');
  const [prevUrl , setPrevUrl] = useState('');

  

  async function downlodePokemon() {
    const response = await axios.get(POKEDEX_URL); //This downlodes list of 20 pokemons

    const pokemonResult = response.data.results;  //we get array of pokemons from result

setNextUrl(response.data.next);
setPrevUrl(response.data.previous);
   

    //iterating over array of pokemon and using their url  to create an array of promises
    //this will downlode those 20 pokemon
    const pokemonResultPromish = pokemonResult.map((pokemon) =>
      axios.get(pokemon.url)
    );

    //Passing the promish array to axios.all
    const pokemonData = await axios.all(pokemonResultPromish);  //Array of 20 pokemon details data
   

     //now iterate through data of each pokrmon and extract {id , name , image , types}
    const PokelistResult =  pokemonData.map((pokeData) => {
      setIsLoading(false);
        const pokemon = pokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
           image:
            pokemon.sprites.other["official-artwork"].front_default,
          types: pokemon.types
        };
      })
      setPokemonList(PokelistResult);
      console.log(PokelistResult);
      
  

    setIsLoading(false);
  }

  useEffect(() => {
    downlodePokemon();
  }, [POKEDEX_URL ]);

  return (
    <div className=" mx-auto mt-10 p-6 font-poppins">
  {/* Pokémon list */}
  <div className="flex flex-wrap justify-center gap-6">
    {isLoading
      ? "Loading ....."
      : pokemonList.map((p) => (
          <Pokemon key={p.id} name={p.name} image={p.image} id = {p.id} />
        ))}
  </div>

  {/* Pagination buttons */}
  <div className="flex justify-center gap-6 mt-8">
  <button
    onClick={() => setPOKEDEX_URL(prevUrl)}
    className="px-4 py-2 text-black rounded-lg shadow outline-1 outline-black"
    disabled={!prevUrl}
  >
    Previous
  </button>
  <button
    onClick={() => setPOKEDEX_URL(nextUrl)}
    className="px-4 py-2 text-black rounded-lg shadow outline-1 outline-black"
    disabled={!nextUrl}
  >
    Next
  </button>
</div>


  {/* /Footer/ */}

   <h4 className=" fixed bottom-3 right-3 text-md text-white">
  Made with 🖤 by{" "}
  <a
    href="https://www.linkedin.com/in/akashchoudhary007/"
    className=" hover:text-black"
  >
    <span>Akash</span>
  </a>
</h4>
</div>

  );
}
