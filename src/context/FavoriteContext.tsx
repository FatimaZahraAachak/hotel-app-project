import { createContext, useEffect, useState } from "react";
import type { Hotel } from "../types";
import { supabase } from "../services/supabase";
type FavoriteContextValue = {
    favorites: Hotel[],
    addToFavorites: (hotel: Hotel) => void,
    isFavorite: (hotel: Hotel) => void,
    removeFromFavorites: (hotel: Hotel) => void
}
export const FavoriteContext = createContext<FavoriteContextValue | undefined>(undefined);

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
    const [favorites, setFavorites] = useState<Hotel[]>([])
    useEffect(() => {
        getFavorites();
    }, [])

    async function getFavorites() {
        const { data } = await supabase.from("favorites").select();
        if (!data) return;
        setFavorites(data);
    }
    async function addToFavorites() {

    }
    async function removeFromFavorites() {

    }
    async function isFavorite() {

    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }
    return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>

}