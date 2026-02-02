
import HotelCard from "./HotelCard/HotelCard";
import { useFilterHotels } from "../queries/search";
type HotelSearchResultsProps = {
    searchTerm: string,
    country: string
}

function HotelSearchResults({ searchTerm, country }: HotelSearchResultsProps) {
    const { isPending, data, error } = useFilterHotels({ searchTerm, country })

    if (isPending) {
        return <p className="col-span-full rounded-2xl bg-white p-8 text-center text-gray-600 shadow">Chargement des favoris...</p>
    }
    if (error) {
        return <p className="col-span-full rounded-2xl bg-white p-8 text-center text-gray-600 shadow">Erreur lors du chargement des favoris</p>
    }
    const hotels = data ?? [];

    if (hotels.length === 0) {
        <div className="col-span-full rounded-2xl bg-white p-8 text-center text-gray-600 shadow">
            Aucun resultat trouvé.
        </div>
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {
                hotels.map((hotel) => (
                    <div key={hotel.id} className="h-full">
                        <HotelCard hotel={hotel} />
                    </div>
                ))}

        </div>

    );

}
export default HotelSearchResults;