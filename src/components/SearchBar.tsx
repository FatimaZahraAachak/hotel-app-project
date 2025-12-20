import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";

function SearchBar() {
    const [inputValue, setInputValue] = useState<string>('');
    const isDisabled = inputValue.trim().length === 0;
    const ctx = useContext(SearchContext);
    if (!ctx) {
        return <p>Erreur : SearchProvider manquant ⚠️</p>
    }

    const { setSearchTerm } = ctx;
    const handleSearch = () => {
        if (isDisabled) return;
        setSearchTerm(inputValue.trim());
    }

    return (
        <div className="flex w-full items-center gap-2 ">
            <input type="w-full text" placeholder="Rechercher" onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleSearch();
                }
            }} value={inputValue}
                className=" rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2
focus:ring-blue-200"
            />
            <button type="button" disabled={isDisabled} className={`shrink-0 inline-flex items-center justify-center rounded-xl px-3 py-2 transition
          ${isDisabled
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`} onClick={handleSearch} aria-label="Rechercher">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                    />
                </svg>

            </button>
        </div>
    )
}
export default SearchBar;