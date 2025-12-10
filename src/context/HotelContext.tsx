import { createContext, useEffect, useMemo, useState } from "react";
import type { Hotel } from "../types";
import { supabase } from "../services/supabase";
type HotelContextValue = {
    hotels: Hotel[],
    getHotelById: (id: number) => Hotel | undefined
}
export const HotelContext = createContext<HotelContextValue | undefined>(undefined);

export const HotelProvider = ({ children }: { children: React.ReactNode }) => {
    const [hotels, setHotels] = useState<Hotel[]>([])
    useEffect(() => {
        getHotels();
    }, [])

    async function getHotels() {
        const { data } = await supabase.from("hotel").select();
        if (!data) return;
        setHotels(data);
    }

    const value = useMemo<HotelContextValue>(() => ({

        hotels,
        getHotelById: (id: number) => hotels.find(h => h.id === id),
    }), [hotels]);
    return <HotelContext.Provider value={value}>{children}</HotelContext.Provider>

}