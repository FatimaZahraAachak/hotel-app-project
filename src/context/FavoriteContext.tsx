import { createContext } from "react";
type FavoriteContextValue = {
    favoriteIds: number[],
    addToFavorites: (hotelId: number) => Promise<void>,
    isFavorite: (hotelId: number) => boolean,
    removeFromFavorites: (hotelId: number) => Promise<void>
}
export const FavoriteContext = createContext<FavoriteContextValue | undefined>(undefined);

