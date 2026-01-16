import { useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import type { NewReservation, Reservation } from "../types";
import { BookingContext } from "./BookingContext";
import { AuthContext } from "./AuthContext";

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const authContext = useContext(AuthContext);

    const safeUser = authContext?.user;

    useEffect(() => {
        if (!safeUser) return;

        async function getReservations() {
            const { data, error } = await supabase
                .from("reservations")
                .select("*, hotel(*)")
                .eq("user_id", safeUser?.id);

            if (error) {
                console.error(error);
                return;
            }

            if (data) {
                setReservations(data);
            }
        }

        getReservations();
    }, [safeUser]);

    async function addReservation(reservation: NewReservation) {
        if (!safeUser) return;

        const userReservation = {
            ...reservation,
            user_id: safeUser.id,
        };

        const { error } = await supabase
            .from("reservations")
            .insert([userReservation]);

        if (error) {
            console.error(error);
            return;
        }

        const { data } = await supabase
            .from("reservations")
            .select("*, hotel(*)")
            .eq("user_id", safeUser.id);

        if (data) {
            setReservations(data);
        }
    }

    async function removeReservation(resId: number) {
        if (!safeUser) return;

        const { error } = await supabase
            .from("reservations")
            .delete()
            .eq("id", resId)
            .eq("user_id", safeUser.id);

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