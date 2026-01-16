import { useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { FavoriteContext } from "./FavoriteContext";
import { AuthContext } from "./AuthContext";

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
    const [favoriteIds, setFavoriteIds] = useState<number[]>([])
    const authContext = useContext(AuthContext);
    const safeUser = authContext?.user;

    useEffect(() => {
        if (!safeUser) return;

        async function loadFavorites() {
            const { data, error } = await supabase
                .from("favorites")
                .select("hotelId")
                .eq("user_id", safeUser?.id);

            if (error) {
                console.error(error);
                return;
            }

            if (data) {
                setFavoriteIds(data.map(f => f.hotelId));
            }
        }

        loadFavorites();
    }, [safeUser]);

    async function addToFavorites(hotelId: number) {
        if (!safeUser) return;
        if (favoriteIds.includes(hotelId)) return;

        setFavoriteIds(prev => [...prev, hotelId]);

        const { error } = await supabase
            .from("favorites")
            .insert([{
                hotelId,
                user_id: safeUser.id,
            }]);

        if (error) {
            console.error(error);
            setFavoriteIds(prev => prev.filter(id => id !== hotelId));
        }
    }

    async function removeFromFavorites(hotelId: number) {
        if (!safeUser) return;

        setFavoriteIds(prev => prev.filter(id => id !== hotelId));

        const { error } = await supabase
            .from("favorites")
            .delete()
            .eq("hotelId", hotelId)
            .eq("user_id", safeUser.id);

        if (error) {
            console.error(error);
            setFavoriteIds(prev => [...prev, hotelId]);
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