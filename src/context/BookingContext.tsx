import { createContext, useEffect, useState } from "react";
import type { NewReservation, Reservation } from "../types"
import { supabase } from "../services/supabase";

type BookingContextValue = {
    reservations: Reservation[],
    addReservation: (res: NewReservation) => Promise<void>,
    removeReservation: (resId: number) => Promise<void>
}
export const BookingContext = createContext<BookingContextValue | undefined>(undefined)
export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    useEffect(() => {
        getReservation();
    }, [])
    async function getReservation() {
        let { data } = await supabase
            .from('reservations')
            .select('*, hotel(*)');
        if (!data) return;
        console.log(data);
        setReservations(data);
    }
    async function addReservation(reservation: NewReservation) {
        await supabase
            .from('reservations')
            .insert([
                reservation,
            ]);

        getReservation();
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
        getReservation();

    }
    const value = {
        reservations,
        addReservation,
        removeReservation
    }
    return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}