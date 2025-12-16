import { createContext, useEffect, useState } from "react";
import type { Hotel } from "../types";
import { supabase } from "../services/supabase";
type FavoriteContextValue = {
    favorites: Hotel[],
    addToFavorites: (hotel: Hotel) => Promise<void>,
    isFavorite: (hotelId: number) => boolean,
    removeFromFavorites: (hotelId: number) => Promise<void>
}
export const FavoriteContext = createContext<FavoriteContextValue | undefined>(undefined);

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
    const [favorites, setFavorites] = useState<Hotel[]>([])
    useEffect(() => {
        getFavorites();
    }, [])

    async function getFavorites() {
        const { data, error } = await supabase.from('favorites').select();
        if (!data || error) return;
        setFavorites(data);
    }
    async function addToFavorites(hotel: Hotel) {
        const { data, error } = await supabase
            .from('favorites')
            .insert([hotel])
            .select();
        if (error || !data) return;
        getFavorites();
    }

    async function removeFromFavorites(hotelId: number) {

        const { error } = await supabase
            .from('favorites')
            .delete()
            .eq('id', hotelId);
        if (error) {
            console.error(error);
            return;
        }
        getFavorites();
    }

    function isFavorite(hotelId: number): boolean {
        return favorites.some((hotel) => hotel.id === hotelId);
    }


    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }
    return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>

}