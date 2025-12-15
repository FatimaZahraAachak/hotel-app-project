import { createContext, useEffect, useState } from "react";
import type { Reservation } from "../types"
import { supabase } from "../services/supabase";

type BookingContextValue = {
    reservations: Reservation[],
    addReservation: (res: Reservation) => Promise<void>;
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
            .select('*');
        if (!data) return;
        console.log(data);
        setReservations(data);
    }
    async function addReservation(reservation: Reservation) {
        const { data } = await supabase
            .from('reservations')
            .insert([
                reservation,
            ])
            .select();
        if (!data) return;
        getReservation();
    }
    const value = {
        reservations,
        addReservation
    }
    return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}