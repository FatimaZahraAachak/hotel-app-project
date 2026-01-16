import { useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { FavoriteContext } from "./FavoriteContext";
import { AuthContext } from "./AuthContext";

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
    const [favoriteIds, setFavoriteIds] = useState<number[]>([])
    const authContext = useContext(AuthContext);
    const safeUser = authContext?.user;
    useEffect(() => {

        if (safeUser) {
            async function loadFavrorites() {
                const { data, error } = await supabase.from('favorites').select('hotelId').eq('user_id', safeUser?.id);
                if (!data || error) return;
                setFavoriteIds(data.map(f => f.hotelId));
            }
            loadFavrorites();
        }

    }, [safeUser])

    async function addToFavorites(hotelId: number) {

        setFavoriteIds(prev => [...prev, hotelId])
        const { error } = await supabase
            .from('favorites')
            .insert([{
                hotelId,
                user_id: safeUser?.id
            }]);
        if (error) {
            setFavoriteIds(prev => prev.filter(id => id !== hotelId))
        }
    }

    async function removeFromFavorites(hotelId: number) {
        setFavoriteIds(prev => prev.filter(id => id !== hotelId))
        const { error } = await supabase
            .from('favorites')
            .delete()
            .eq('hotelId', hotelId)
            .eq('user_id', safeUser?.id);
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