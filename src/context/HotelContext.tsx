import { createContext, useMemo } from "react";
import type { Hotel } from "../types";
import { Hotels as MOCK_HOTELS } from "../data/mockHotels"
type HotelContextValue = {
    hotels: Hotel[],
    getHotelById: (id: number) => Hotel | undefined
}
export const HotelContext = createContext<HotelContextValue | undefined>(undefined);

export const HotelProvider = ({ children }: { children: React.ReactNode }) => {
    const hotels = MOCK_HOTELS;
    const value = useMemo<HotelContextValue>(() => ({
        hotels,
        getHotelById: (id: number) => hotels.find(h => h.id === id),
    }), [hotels]);
    return <HotelContext.Provider value={value}>{children}</HotelContext.Provider>

}