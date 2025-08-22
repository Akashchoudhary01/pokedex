import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../Hooks/usePokemonList";

export default function PokemonList({ searchTerm = "" }) {
  // If searching, load ALL Pokémon. Otherwise, keep default 20 with pagination.
  const url =
    searchTerm.trim().length > 0
      ? `https://pokeapi.co/api/v2/pokemon?limit=1000`
      : `https://pokeapi.co/api/v2/pokemon`;

  const { pokemonListState, setpokemonListState } = usePokemonList(url, false);

  if (pokemonListState.isLoading) {
    return <p className="text-center text-white mt-10">Loading…</p>;
  }

  // Filter when searching
  let displayedList = pokemonListState.pokemonList;
  if (searchTerm.trim().length > 0) {
    displayedList = pokemonListState.pokemonList.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="mx-auto mt-10 p-6 font-poppins">
      {/* Pokémon list */}
      <div className="flex flex-wrap justify-center gap-6">
        {displayedList.length > 0 ? (
          displayedList.map((p) => (
            <Pokemon key={p.id} name={p.name} image={p.image} id={p.id} />
          ))
        ) : (
          <p className="text-center text-gray-200 w-full">
            No Pokémon found for "{searchTerm}"
          </p>
        )}
      </div>

      {/* Pagination buttons (only when not searching) */}
      {searchTerm.trim().length === 0 && (
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
      )}
    </div>
  );
}
