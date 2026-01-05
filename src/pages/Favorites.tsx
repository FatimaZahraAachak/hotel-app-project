import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import HotelCard from "../components/HotelCard";
import { HotelContext } from "../context/HotelContext";

function Favorites() {
    const hotelContext = useContext(HotelContext);
    if (!hotelContext) {
        return <p>Erreur : HotelProvider manquant ⚠️</p>
    }

    const favoriteContext = useContext(FavoriteContext);
    if (!favoriteContext) {
        return <p>Erreur : FavoriteProvider manquant ⚠️</p>
    }
    const { hotels } = hotelContext;
    const { favoriteIds } = favoriteContext;
    const hasData = favoriteIds && favoriteIds.length > 0;
    const favoritesHotels = hotels.filter(h => favoriteIds.includes(h.id));

    return (
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:py-10">
            <header className="mb-6 md:mb-8">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Hôtels</h1>
            </header>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {hasData ? (
                    favoritesHotels.map((fav) => (
                        <div key={fav.id} className="h-full">
                            <HotelCard hotel={fav} />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full rounded-2xl bg-white p-8 text-center text-gray-600 shadow">
                        Aucune donnée disponible pour le moment.
                    </div>
                )}
            </div>
        </div>
    );
}
export default Favorites