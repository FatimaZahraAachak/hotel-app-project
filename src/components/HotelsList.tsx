import { useContext } from "react";
import { HotelContext } from "../context/HotelContext";
import HotelCard from "./HotelCard";

function HotelsList() {
    const hotelcontext = useContext(HotelContext);
    if (!hotelcontext) {
        return <p>Erreur : HotelProvider manquant ⚠️</p>
    }
    const { hotels } = hotelcontext;
    const hasData = hotels && hotels.length > 0;
    return (
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
    );
}
export default HotelsList;