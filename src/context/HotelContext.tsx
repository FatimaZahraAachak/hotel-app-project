import { createContext, useContext, useMemo } from "react";
import type { Hotel } from "../types";
import { Hotels as MOCK_HOTELS } from "../data/mockHotels"
type HotelContextValue = {
    hotels: Hotel[],
    getHotelById: (id: string) => Hotel | undefined
}
const HotelContext = createContext<HotelContextValue | undefined>(undefined);

export const useHotelContext = () => useContext(HotelContext);

export const HotelProvider = ({ children }: { children: React.ReactNode }) => {
    const hotels = MOCK_HOTELS;
    const value = useMemo<HotelContextValue>(() => ({
        hotels,
        getHotelById: (id: string) => hotels.find(h => h.id === id),
    }), [hotels]);
    return <HotelContext.Provider value={value}>{children}</HotelContext.Provider>

}