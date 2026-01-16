import { useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import type { NewReservation, Reservation } from "../types";
import { BookingContext } from "./BookingContext";
import { AuthContext } from "./AuthContext";

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        const safeUser = authContext?.user;
        if (safeUser) {
            async function getReservation() {
                const { data } = await supabase
                    .from('reservations')
                    .select('*, hotel(*)')
                    .eq('user_id', safeUser?.id);
                if (!data) return;
                console.log(data);
                setReservations(data);
            }
            getReservation();
        }

    })

    async function addReservation(reservation: NewReservation) {
        await supabase
            .from('reservations')
            .insert([
                reservation,
            ]);

        const { data } = await supabase
            .from("reservations")
            .select("*, hotel(*)");

        if (data) setReservations(data);
    }
    async function removeReservation(resId: number) {
        const { error } = await supabase
            .from('reservations')
            .delete()
            .eq('id', resId);
        if (error) {
            console.error(error);
            return;
        }
        setReservations(prev =>
            prev.filter(r => r.id !== resId)
        );

    }

    return <BookingContext.Provider value={{
        reservations,
        addReservation,
        removeReservation
    }}>{children}</BookingContext.Provider>
}