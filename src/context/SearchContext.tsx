import { createContext } from "react";
export type FilterHotelsParams = { searchTerm: string, country: string };
type SearchContextValue = {
    searchTerm: string,
    setSearchTerm: (value: string) => void;
    country: string,
    setCountry: (value: string) => void,
}
export const SearchContext = createContext<SearchContextValue | undefined>(undefined);

