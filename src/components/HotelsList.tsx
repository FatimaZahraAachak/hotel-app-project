import HotelCard from "./HotelCard/HotelCard";
import { useHotelsInfinite } from "../queries/hotels";
import type { Hotel } from "../types";

function HotelsList() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useHotelsInfinite();


    const hotels: Hotel[] = data?.pages.flat() ?? [];
    const hasData = hotels.length > 0;
    const handlRecharge = () => {
        fetchNextPage();
    }
    if (status === "pending") return <p>Chargement...</p>;
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {hasData ? (
                <>
                    {hotels.map((hotel) => (
                        <div key={hotel.id} className="h-full">
                            <HotelCard hotel={hotel} />
                        </div>

                    ))}

                    {hasNextPage && (<div className="col-span-full mt-4 flex justify-center " >
                        <button className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" type='button' onClick={handlRecharge}>
                            {isFetchingNextPage ? "Chargement..." : "Voir plus"}
                            <span aria-hidden="true">→</span>
                        </button>
                    </div>)}
                </>
            )
                : (
                    <div className="col-span-full rounded-2xl bg-white p-8 text-center text-gray-600 shadow">
                        Aucune donnée disponible pour le moment.
                    </div>
                )}
        </div>
    );
}
export default HotelsList;