import { createContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";
type FavoriteContextValue = {
    favoriteIds: number[],
    addToFavorites: (hotelId: number) => Promise<void>,
    isFavorite: (hotelId: number) => boolean,
    removeFromFavorites: (hotelId: number) => Promise<void>
}
export const FavoriteContext = createContext<FavoriteContextValue | undefined>(undefined);

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
    const [favoriteIds, setFavoriteIds] = useState<number[]>([])
    useEffect(() => {
        loadFavrorites();
    }, [])

    async function loadFavrorites() {
        const { data, error } = await supabase.from('favorites').select('hotelId');
        if (!data || error) return;
        setFavoriteIds(data.map(f => f.hotelId));
    }
    async function addToFavorites(hotelId: number) {
        setFavoriteIds(prev => [...prev, hotelId])
        const { error } = await supabase
            .from('favorites')
            .insert([{ hotelId }]);
        if (error) {
            setFavoriteIds(prev => prev.filter(id => id !== hotelId))
        }
    }

    async function removeFromFavorites(hotelId: number) {
        setFavoriteIds(prev => prev.filter(id => id !== hotelId))
        const { error } = await supabase
            .from('favorites')
            .delete()
            .eq('hotelId', hotelId);
        if (error) {
            setFavoriteIds(prev => [...prev, hotelId])
            console.error(error);
        }
       
    }

    function isFavorite(hotelId: number): boolean {
        return favoriteIds.includes(hotelId);
    }


    const value = {
        favoriteIds,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }
    return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>

}