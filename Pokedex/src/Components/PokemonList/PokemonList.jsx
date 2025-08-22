import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../Hooks/usePokemonList";

export default function PokemonList({ searchTerm }) {
  const { pokemonListState } = usePokemonList(`https://pokeapi.co/api/v2/pokemon`);

  if (!pokemonListState || !pokemonListState.pokemonList) {
    return <p className="text-center text-white">Loading...</p>;
  }

  // Filter based on search term
  const filteredList = pokemonListState.pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {filteredList.length > 0 ? (
        filteredList.map((p) => <Pokemon key={p.id} pokemon={p} />)
      ) : (
        <p className="col-span-full text-center text-gray-300">No Pokémon found</p>
      )}
    </div>
  );
}
