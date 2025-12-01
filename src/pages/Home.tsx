import { useContext } from "react";
import HotelCard from "../components/HotelCard";
import { HotelContext } from "../context/HotelContext";

function Home() {
    const ctx = useContext(HotelContext);
    if (!ctx) {
        return <p>Erreur : HotelProvider manquant ⚠️</p>
    }
    const { hotels } = ctx;
    const hasData = hotels && hotels.length > 0;

    return (
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:py-10">
            <header className="mb-6 md:mb-8">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Hôtels</h1>
                {/* Optionnel: sous-titre future search/filters
        <p className="mt-1 text-sm text-gray-600">Trouvez votre prochain séjour ✨</p>
        */}
            </header>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {hasData ? (
                    hotels.map((hotel) => (
                        <div key={hotel.id} className="h-full">
                            <HotelCard hotel={hotel} />
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

export default Home;
