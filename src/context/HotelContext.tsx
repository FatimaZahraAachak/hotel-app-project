import { createContext, useEffect, useState } from "react";
import type { Hotel } from "../types";
import { supabase } from "../services/supabase";
type HotelContextValue = {
    hotels: Hotel[],
    setHotels: (hotels: Hotel[]) => void,
    page: number,
    setPage: (page: number) => void,
    getHotelById: (id: number) => Promise<Hotel | null>
}
export const HotelContext = createContext<HotelContextValue | undefined>(undefined);
const pageSize = 9;
export const HotelProvider = ({ children }: { children: React.ReactNode }) => {
    const [hotels, setHotels] = useState<Hotel[]>([])
    const [page, setPage] = useState<number>(0);


    useEffect(() => {
        getHotels();
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
    async function getHotelById(id: number): Promise<Hotel | null> {
        const cache = hotels.find((h) => h.id === id);
        if (cache) {
            return {
                ...cache,
                amenities: cache.amenities ?? []
            }
        }
        const { data, error } = await supabase.from("hotel").select('*').eq('id', id).single();
        if (!data || error) return null;
        return {
            ...data,
            amenities: data.amenities ?? []
        };

    }

    const value = {
        hotels,
        setHotels,
        page,
        setPage,
        getHotelById
    }
    return <HotelContext.Provider value={value}>{children}</HotelContext.Provider>

}