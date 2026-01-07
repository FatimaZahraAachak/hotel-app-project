import { Link, useNavigate } from "react-router-dom";
import type { Hotel } from "../types";
import { FavoriteContext } from "../context/FavoriteContext";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

type Props = {
    hotel: Hotel;
};

function HotelCard({ hotel }: Props) {
    const navigate = useNavigate();
    const ctx = useContext(FavoriteContext);
    const authContext = useContext(AuthContext);
    if (!ctx) {
        return <p>Erreur : FavoriteProvider manquant ⚠️</p>
    }
    if (!authContext) {
        return <p> Erreur: AuthProvider manquant⚠️ </p>
    }
    const { user } = authContext;
    const { isFavorite, addToFavorites, removeFromFavorites } = ctx;
    const favorite = isFavorite(hotel.id);
    const onFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (user) {
            if (favorite) removeFromFavorites(hotel.id);
            else addToFavorites(hotel.id);
        }
        else navigate("/login");
    }

    return (
        <div className="group rounded-2xl bg-white shadow-md hover:shadow-lg transition overflow-hidden">
            <Link
                to={`/hotels/${hotel.id}`}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label={`Voir ${hotel.name} à ${hotel.location}`}
            >
                <div className="relative w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden">
                    <img
                        src={hotel.image}
                        alt={`${hotel.name} — ${hotel.location}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                    />


                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-800 shadow-sm backdrop-blur">
                        <span className="text-amber-500">★</span>
                        <span>{hotel.rating.toFixed(1)}</span>
                    </div>

                    <div className="absolute right-3 top-3 inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-800 shadow-sm backdrop-blur">
                        <button
                            onClick={onFavoriteClick}
                            className={
                                `transition text-base
       ${favorite ? "text-red-500" : "text-gray-400 hover:text-red-400"}`
                            }
                        >
                            ♥
                        </button>
                    </div>


                    <div className="absolute right-3 bottom-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-900 shadow backdrop-blur">
                        <span>💶</span>
                        <span>{hotel.price} € / nuit</span>
                    </div>
                </div>

                <div className="p-4 pb-3">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <h3 className="truncate text-lg md:text-xl font-semibold text-gray-900">
                                {hotel.name}
                            </h3>
                            <p className="mt-0.5 truncate text-sm text-gray-500">{hotel.location}</p>
                        </div>


                        <div className="hidden sm:flex items-center gap-1 shrink-0">
                            <span className="text-amber-500">★</span>
                            <span className="text-sm font-medium text-gray-700">
                                {hotel.rating.toFixed(1)}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>


            <div className="px-4 pb-4">
                <Link
                    to={`/hotels/${hotel.id}`}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                    Voir plus
                </Link>
            </div>
        </div>
    );
}

export default HotelCard;
