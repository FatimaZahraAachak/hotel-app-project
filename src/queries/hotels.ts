import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "../services/supabase";
import type { Hotel } from "../types";

async function loadHotels(page: number): Promise<Hotel[]> {
    const pageSize = 9;
    const from = pageSize * page;
    const to = from + pageSize - 1;

    const { data, error } = await supabase.from("hotel").select('*').range(from, to);
    if (error) {
        throw error;
    }
    return data ?? [];
}
export function useHotelsInfinite() {
    return useInfiniteQuery<Hotel[], Error, Hotel[], ["hotels"], number>({
        queryKey: ["hotels"],
        initialPageParam: 0,
        queryFn: ({ pageParam = 0 }) => loadHotels(pageParam),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < 9) {
                return undefined;
            }
            return allPages.length;
        }
    });

}