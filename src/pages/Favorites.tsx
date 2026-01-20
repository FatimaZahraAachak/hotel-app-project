import { useContext } from "react";
import HotelCard from "../components/HotelCard";
import { HotelContext } from "../context/HotelContext";
import { AuthContext } from "../context/AuthContext";
import {  useFavorites } from "../queries/favorites";

function Favorites() {
    const hotelContext = useContext(HotelContext);
    const authContext = useContext(AuthContext);
    const userId = authContext?.user?.id;
    const { isPending, data, error } = useFavorites(userId);
    const favoriteIds = data ? data.map(f => f.hotelId) : [];
    if (!hotelContext) {
        return <p>Erreur : HotelProvider manquant ⚠️</p>
    }
    const { hotels } = hotelContext;
    const hasData = favoriteIds && favoriteIds.length > 0;
    const favoritesHotels = hotels.filter(h => favoriteIds.includes(h.id));
    if (!authContext) {
        return <p>Erreur : AuthProvider manquant ⚠️</p>
    }

    if (isPending) {
        return <p className="col-span-full rounded-2xl bg-white p-8 text-center text-gray-600 shadow">Chargement des favoris...</p>
    }
    if (error) {
        <p className="col-span-full rounded-2xl bg-white p-8 text-center text-gray-600 shadow">Erreur lors du chargement des favoris</p>
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:py-10">
            <header className="mb-6 md:mb-8">
                <h1 className="text-xl md:text-2xl font-bold text-blue-500">Hôtels Favoris</h1>
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