import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../Hooks/usePokemonList";

export default function PokemonList() {
  const {pokemonListState , setpokemonListState} = usePokemonList()


  return (
    <div className="mx-auto mt-10 p-6 font-poppins">
      {/* Pokémon list */}
      <div className="flex flex-wrap justify-center gap-6">
        {pokemonListState.isLoading
          ? "Loading ....."
          : pokemonListState.pokemonList.map((p) => (
              <Pokemon key={p.id} name={p.name} image={p.image} id={p.id} />
            ))}
      </div>

      {/* Pagination buttons */}
      <div className="flex justify-center gap-6 mt-8">
        <button
          onClick={() =>
            setpokemonListState((prev) => ({
              ...prev,
              POKEDEX_URL: prev.prevUrl,
            }))
          }
          className="px-4 py-2 text-black rounded-lg shadow outline-1 outline-black"
          disabled={!pokemonListState.prevUrl}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setpokemonListState((prev) => ({
              ...prev,
              POKEDEX_URL: prev.nextUrl,
            }))
          }
          className="px-4 py-2 text-black rounded-lg shadow outline-1 outline-black"
          disabled={!pokemonListState.nextUrl}
        >
          Next
        </button>
      </div>
    </div>
  );
}
