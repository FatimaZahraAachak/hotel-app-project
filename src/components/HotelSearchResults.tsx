import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import HotelCard from "./HotelCard/HotelCard";

function HotelSearchResults() {
    const searchcontext = useContext(SearchContext);
    if (!searchcontext) {
        return <p>Erreur : SearchProvider manquant ⚠️</p>
    }
    const { loading, results } = searchcontext;

    if (loading) {
        return (
            <div className="rounded-2xl bg-white p-8 text-center text-gray-600 shadow">
                Chargement...
            </div>
        );
    }


    const hasData = results.length > 0;
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hasData ? (
                results.map((hotel) => (
                    <div key={hotel.id} className="h-full">
                        <HotelCard hotel={hotel} />
                    </div>
                ))
            ) : (
                <div className="col-span-full rounded-2xl bg-white p-8 text-center text-gray-600 shadow">
                    Aucun resultat trouvé.
                </div>
            )}
        </div>

    );

}
export default HotelSearchResults;