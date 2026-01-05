import { useEffect, useState} from "react";
import { supabase } from "../services/supabase";
import type { Hotel } from "../types";
import { HotelContext } from "./HotelContext";
export const HotelProvider = ({ children }: { children: React.ReactNode }) => {
    const [hotels, setHotels] = useState<Hotel[]>([])
    const [page, setPage] = useState<number>(0);
    const pageSize = 9;

    useEffect(() => {
        async function getHotels() {
            const from = pageSize * page;
            const to = from + pageSize - 1;

            const { data, error } = await supabase.from("hotel").select('*').range(from, to);
            if (error) {
                console.error("erreur");
                return;
            }
            if (!data) return;
            if (page === 0) setHotels(data ?? []);
            else setHotels(prevHotels => prevHotels.concat(data));
        }
        getHotels();
    }, [page])

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

    return <HotelContext.Provider value={{
        hotels,
        page,
        setPage,
        getHotelById
    }}>{children}</HotelContext.Provider>

}