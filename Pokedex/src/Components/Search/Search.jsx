export default function Search({ updateSearchTerm }) {
  return (
    <input 
      type="text" 
      placeholder="Pokemon Name................." 
      className="w-full max-w-xl text-white mx-auto block text-md pl-3 py-3 border border-black rounded-xl outline-none" 
      onChange={(e) => updateSearchTerm(e.target.value)}
    />
  );
}
