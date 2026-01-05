import { useState } from "react";
import type { Hotel } from "../types";
import { supabase } from "../services/supabase";
import { SearchContext, type FilterHotelsParams } from "./SearchContext";

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

    return <SearchContext.Provider value={{
        searchTerm,
        setSearchTerm,
        country,
        setCountry,
        filterHotels,
        results,
        loading
    }}>{children}</SearchContext.Provider>


}