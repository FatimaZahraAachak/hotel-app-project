import { createContext, useEffect, useState } from "react";
import type { Hotel } from "../types";
import { supabase } from "../services/supabase";
type FavoriteContextValue = {
    favorites: Hotel[],
    addToFavorites: (hotel: Hotel) => void,
    isFavorite: (reservationId: number) => void,
    removeFromFavorites: (reservationId: number) => void
}
export const FavoriteContext = createContext<FavoriteContextValue | undefined>(undefined);

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
    const [favorites, setFavorites] = useState<Hotel[]>([])
    useEffect(() => {
        getFavorites();
    }, [])

    async function getFavorites() {
        const { data } = await supabase.from('favorites').select();
        if (!data) return;
        setFavorites(data);
    }
    async function addToFavorites(favorites: Hotel) {
        const { data } = await supabase
            .from('favorites')
            .insert([
                favorites,
            ])
            .select();
        if (!data) return;
        getFavorites();
    }

    async function removeFromFavorites(reservationId: number) {

        const { error } = await supabase
            .from('favorites')
            .delete()
            .eq('id', reservationId);
        if (!error) return;
        getFavorites();
    }
    async function isFavorite(reservationId: number) {
        const { data } = await supabase
            .from('favorites')
            .select()
            .eq('id', reservationId);
        if (!data) return;
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }
    return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>

}