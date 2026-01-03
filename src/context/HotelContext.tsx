import { createContext, useEffect, useState } from "react";
import type { Hotel } from "../types";
import { supabase } from "../services/supabase";
type HotelContextValue = {
    hotels: Hotel[],
    setHotels: (hotels: Hotel[]) => void,
    page: number,
    setPage: (page: number) => void
}
export const HotelContext = createContext<HotelContextValue | undefined>(undefined);
const pageSize = 9;
export const HotelProvider = ({ children }: { children: React.ReactNode }) => {
    const [hotels, setHotels] = useState<Hotel[]>([])
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        getHotels();
        console.log("appel")
    }, [page])

    async function getHotels() {
        const from = pageSize * page;
        const to = from + pageSize - 1;

        const { data, error } = await supabase.from("hotel").select('*').range(from, to);
        if (error) {
            console.log("erreur");
            return;
        }
        if (!data) return;
        if (page === 0) setHotels(data ?? []);
        else setHotels(prevHotels => prevHotels.concat(data));
    }

    const value = {
        hotels,
        setHotels,
        page,
        setPage

    }
    return <HotelContext.Provider value={value}>{children}</HotelContext.Provider>

}