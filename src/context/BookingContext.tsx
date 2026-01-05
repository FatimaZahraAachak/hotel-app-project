import { createContext } from "react";
import type { NewReservation, Reservation } from "../types"
type BookingContextValue = {
    reservations: Reservation[],
    addReservation: (res: NewReservation) => Promise<void>,
    removeReservation: (resId: number) => Promise<void>
}
export const BookingContext = createContext<BookingContextValue | undefined>(undefined)
