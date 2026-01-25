import { createContext } from "react";
import type { Hotel } from "../types";

type HotelContextValue = {
    getHotelById: (id: number) => Promise<Hotel | null>
}
export const HotelContext = createContext<HotelContextValue | undefined>(undefined);

