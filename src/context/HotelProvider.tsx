import { supabase } from "../services/supabase";
import type { Hotel } from "../types";
import { HotelContext } from "./HotelContext";
export const HotelProvider = ({ children }: { children: React.ReactNode }) => {

    async function getHotelById(id: number): Promise<Hotel | null> {
     
        const { data, error } = await supabase.from("hotel").select('*').eq('id', id).single();
        if (!data || error) return null;
        return {
            ...data,
            amenities: data.amenities ?? []
        };

    }

    return <HotelContext.Provider value={{
        getHotelById
    }}>{children}</HotelContext.Provider>

}