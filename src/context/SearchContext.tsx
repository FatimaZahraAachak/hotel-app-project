import { createContext } from "react";
import type { Hotel } from "../types";
export type FilterHotelsParams = { searchTerm: string, country: string };
type SearchContextValue = {
    searchTerm: string,
    setSearchTerm: (value: string) => void;
    country: string,
    results: Hotel[],
    loading: boolean,
    setCountry: (value: string) => void,
    filterHotels: (data: FilterHotelsParams) => Promise<Hotel[]>

}
export const SearchContext = createContext<SearchContextValue | undefined>(undefined);

