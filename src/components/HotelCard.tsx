import { Link } from "react-router-dom"
import type { Hotel } from "../types"

type Props = {
    hotel: Hotel
}
function HotelCard({ hotel }: Props) {

    return (
        <div className="group rounded-2xl bg-white shadow-md hover:shadow-lg transition overflow-hidden">
            {/* Lien cliquable (image + entête) */}
            <Link to={`/hotels/${hotel.id}`} className="block">
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                    />
                </div>

                <div className="p-4 pb-3">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{hotel.name}</h3>
                            <p className="text-sm text-gray-500">{hotel.location}</p>
                        </div>

                        {/* Note (étoiles + chiffre) */}
                        <div className="flex items-center gap-1 shrink-0">
                            <span className="text-amber-500">★</span>
                            <span className="text-sm font-medium text-gray-700">
                                {hotel.rating.toFixed(1)}
                            </span>
                        </div>
                    </div>

                    {/* Prix (si tu veux l’afficher plus tard) */}
                    {/* <p className="mt-2 text-sm text-gray-600">{hotel.price} € / nuit</p> */}
                </div>
            </Link>

            {/* Actions */}
            <div className="px-4 pb-4 flex items-center justify-between">
                <Link
                    to={`/hotels/${hotel.id}`}
                    className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium
                     bg-gray-900 text-white hover:bg-gray-800 transition"
                >
                    Voir plus
                </Link>
            </div>
        </div>
    )
}
export default HotelCard