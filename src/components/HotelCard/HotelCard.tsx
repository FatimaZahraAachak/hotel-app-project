import { Link } from "react-router-dom";
import type { Hotel } from "../../types";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FavoritesButton } from "./FavoritesButton";

type Props = {
    hotel: Hotel;
};

function HotelCard({ hotel }: Props) {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return <p data-testid="auth-error">Erreur : FavoriteProvider manquant ⚠️</p>;
    }

    const { user } = authContext;

    return (
        <div
            data-testid="hotel-card"
            className="group rounded-2xl bg-white shadow-md hover:shadow-lg transition overflow-hidden"
        >
            <Link
                to={`/hotels/${hotel.id}`}
                data-testid="hotel-main-link"
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label={`Voir ${hotel.name} à ${hotel.location}`}
            >
                <div className="relative w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden">
                    <img
                        data-testid="hotel-image"
                        src={hotel.image}
                        alt={`${hotel.name} — ${hotel.location}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />

                    <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-800 shadow-sm backdrop-blur">
                        <span className="text-amber-500">★</span>
                        <span data-testid="hotel-rating">
                            {hotel.rating.toFixed(1)}
                        </span>
                    </div>

                    {user && (
                        <div data-testid="favorites-button">
                            <FavoritesButton userId={user.id} hotel={hotel} />
                        </div>
                    )}

                    <div
                        data-testid="hotel-price"
                        className="absolute right-3 bottom-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-900 shadow backdrop-blur"
                    >
                        💶 {hotel.price} € / nuit
                    </div>
                </div>

                <div className="p-4 pb-3">
                    <h3
                        data-testid="hotel-name"
                        className="truncate text-lg md:text-xl font-semibold text-gray-900"
                    >
                        {hotel.name}
                    </h3>

                    <p
                        data-testid="hotel-location"
                        className="mt-0.5 truncate text-sm text-gray-500"
                    >
                        {hotel.location}
                    </p>
                </div>
            </Link>

            <div className="px-4 pb-4">
                <Link
                    to={`/hotels/${hotel.id}`}
                    data-testid="hotel-see-more"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                    Voir plus
                </Link>
            </div>
        </div>
    );
}

export default HotelCard;