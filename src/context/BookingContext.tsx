import { createContext, useState } from "react";
import type { Reservation } from "../types"

type BookingContextValue = {
    reservations: Reservation[],
    addReservation: (res: Reservation) => void;
}
export const BookingContext = createContext<BookingContextValue | undefined>(undefined)
export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const addReservation = (res: Reservation) => {
        setReservations(prev => [...prev, res]);
    }


    const value = {
        reservations,
        addReservation
    }
    return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}