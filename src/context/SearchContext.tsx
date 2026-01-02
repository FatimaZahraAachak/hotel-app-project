import { createContext, useState } from "react";
import { supabase } from "../services/supabase";
import type { Hotel } from "../types";
type FilterHotelsParams = { searchTerm: string, country: string };
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

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [results, setResults] = useState<Hotel[]>([])
    const [loading, setLoading] = useState(false);
    async function filterHotels({ searchTerm, country }: FilterHotelsParams): Promise<Hotel[]> {
        try {
            setLoading(true);
            const s = searchTerm.trim();
            const c = country.trim();
            let query = supabase
                .from('hotel')
                .select('*');

            if (s) query = query.ilike('name', `%${s}%`);
            if (c) query = query.ilike('location', `%${c}%`);

            const { data } = await query;
            setResults(data ?? []);
            return data ?? [];
        }

        catch (error) {
            console.error("Supabase error:", error);
            setResults([]);
            return [];
        }
        finally {
            setLoading(false);
        }

    }
    const value = {
        searchTerm,
        setSearchTerm,
        country,
        setCountry,
        filterHotels,
        results,
        loading
    }

    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>


}