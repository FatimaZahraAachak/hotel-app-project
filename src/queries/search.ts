import { useQuery } from "@tanstack/react-query";
import type { FilterHotelsParams } from "../context/SearchContext";
import { supabase } from "../services/supabase";
import type { Hotel } from "../types";

async function filterHotels({ searchTerm, country }: FilterHotelsParams): Promise<Hotel[]> {

    const s = searchTerm.trim();
    const c = country.trim();
    let query = supabase
        .from('hotel')
        .select('*');

    if (s) query = query.ilike('name', `%${s}%`);
    if (c) query = query.ilike('location', `%${c}%`);

    const { data, error } = await query;

    if (error) {
        throw error;
    }

    return data ?? [];
}
export function useFilterHotels({ searchTerm, country }: { searchTerm: string; country: string }) {
    const { isPending, error, data } = useQuery({
        queryKey: ["search-hotels", searchTerm, country],
        queryFn: () => filterHotels({ searchTerm, country }),
        enabled: !!(searchTerm || country)
    })
    return { data, isPending, error };
}