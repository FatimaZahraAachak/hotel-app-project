import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { countries } from "../data/countries";


function SearchBar() {
    const [inputValue, setInputValue] = useState<string>('');
    const [countryValue, setCountryValue] = useState<string>('');

    const ctx = useContext(SearchContext);
    if (!ctx) {
        return <p>Erreur : SearchProvider manquant ⚠️</p>
    }

    const { setSearchTerm, setCountry } = ctx;

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchTerm(inputValue.trim());
        setCountry(countryValue.trim());


    }
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }
    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCountryValue(e.target.value);
    }


    return (
        <form className="flex w-full items-center gap-2 " onSubmit={handleSearch}>

            <input type="text" placeholder="Rechercher" onChange={handleChangeInput}
                value={inputValue}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2
focus:ring-blue-200"
            />
            <select className="rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2
focus:ring-blue-200" value={countryValue} onChange={handleChangeSelect}>
                <option value=''>tous les pays</option>
                {countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </select>



            <button type="submit" className={`shrink-0 inline-flex items-center justify-center rounded-xl px-3 py-2 transition bg-blue-600 text-white hover:bg-blue-700`} aria-label="Rechercher" >
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
        </form>
    )
}
export default SearchBar;