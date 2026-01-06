import { FavoriteProvider } from "../../context/FavoriteProvider";
import Favorites from "./Favorites";

export function FavoritesPage() {
    return (
        <FavoriteProvider>
            <Favorites />
        </FavoriteProvider>
    );
}