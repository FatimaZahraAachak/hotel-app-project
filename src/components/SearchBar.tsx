import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";

function SearchBar() {
    const [inputValue, setInputValue] = useState<string>('');
    const ctx = useContext(SearchContext);
    if (!ctx) {
        return <p>Erreur : SearchProvider manquant ⚠️</p>
    }

    const { setSearchTerm } = ctx;
    const handleSearch = () => {
        setSearchTerm(inputValue);
    }

    return (
        <div className="flex items-center gap-2 ">
            <input type="text" placeholder=" Rechercher" onChange={(e) => setInputValue(e.target.value)} value={inputValue}
                className=" rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
            <button className="rounded-xl bg-blue-600 px-2 py-2 text-sm font-medium text-white hover:bg-blue-700 transition" onClick={handleSearch}>search</button>
        </div>
    )
}
export default SearchBar;