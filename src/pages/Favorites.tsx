import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import HotelCard from "../components/HotelCard";

function Favorites(){
    const ctx = useContext(FavoriteContext);
    if (!ctx) {
        return <p>Erreur : FavoriteProvider manquant ⚠️</p>
    }
    const { favorites } = ctx;
    const hasData = favorites && favorites.length > 0;

    return (
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:py-10">
            <header className="mb-6 md:mb-8">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Hôtels</h1>
            </header>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {hasData ? (
                    favorites.map((fav) => (
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