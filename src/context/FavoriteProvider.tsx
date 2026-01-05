import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { FavoriteContext } from "./FavoriteContext";

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
    const [favoriteIds, setFavoriteIds] = useState<number[]>([])


    useEffect(() => {
        async function loadFavrorites() {
            const { data, error } = await supabase.from('favorites').select('hotelId');
            if (!data || error) return;
            setFavoriteIds(data.map(f => f.hotelId));
        }
        loadFavrorites();
    }, [])

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


    return <FavoriteContext.Provider value={{
        favoriteIds,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }}>{children}</FavoriteContext.Provider>

}