import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../services/supabase";


async function loadFavorites(userId?: string) {
    const { data, error } = await supabase
        .from("favorites")
        .select("hotelId")
        .eq("user_id", userId);

    if (error) {
        throw error;
    }
    return data;
}


export function useFavorites(userId?: string) {
    const { isPending, error, data } = useQuery({
        queryKey: ["favorites", userId],
        queryFn: () => loadFavorites(userId as string),
        enabled: !!userId
    })
    return { data, isPending, error };
}

async function addFavorites({ hotelId, userId }: { hotelId: number, userId: string }) {
    const { error } = await supabase
        .from("favorites")
        .insert([{
            hotelId,
            user_id: userId,
        }]);

    if (error) {
        throw error;
    }
}
export function useAddFavorites(userId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ hotelId }: { hotelId: number }) => addFavorites({ hotelId, userId }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favorites", userId],
            });
        },
    })
}