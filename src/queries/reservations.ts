import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../services/supabase";

async function loadReservations(userId: string) {
    const { data, error } = await supabase
        .from("reservations")
        .select("*, hotel(*)")
        .eq("user_id", userId);

    if (error) {
        throw error;
    }

    return data;

}
export function useReservations(userId?: string) {
    const { isPending, error, data } = useQuery({
        queryKey: ["reservations", userId],
        queryFn: () => loadReservations(userId as string),
        enabled: !!userId
    })
    return { data, isPending, error };
}
async function addReservations({ hotelId, userId }: { hotelId: number; userId: string }) {
    const { error } = await supabase
        .from("reservations")
        .insert([{
            hotelId,
            user_id: userId,
        }]);

    if (error) {
        throw error;
    }
}
export function useAddReservations(userId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ hotelId }: { hotelId: number }) => addReservations({ hotelId, userId }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["reservations", userId],
            });
        },
    })
}
async function RemoveReservations({ resId, userId }: { resId: number; userId: string }) {
    const { error } = await supabase
        .from("reservations")
        .delete()
        .eq("id", resId)
        .eq("user_id", userId);

    if (error) {
        throw error;
    }

}
export function useRemoveFavorites(userId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ resId }: { resId: number }) => RemoveReservations({ resId, userId }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["reservations", userId],
            });
        },
    })
}
