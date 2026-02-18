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
        <div data-testid="hotel-card" className="group rounded-2xl bg-white shadow-md hover:shadow-lg transition overflow-hidden">

            <Link
                to={`/hotels/${hotel.id}`}
                data-testid="hotel-main-link"
                aria-label={`Voir ${hotel.name} à ${hotel.location}`}
            >
                <div>
                    <img
                        data-testid="hotel-image"
                        src={hotel.image}
                        alt={`${hotel.name} — ${hotel.location}`}
                    />

                    <div>
                        <span data-testid="hotel-rating">
                            {hotel.rating.toFixed(1)}
                        </span>
                    </div>

                    {user && (
                        <div data-testid="favorites-button">
                            <FavoritesButton userId={user.id} hotel={hotel} />
                        </div>
                    )}

                    <div data-testid="hotel-price">
                        {hotel.price} € / nuit
                    </div>
                </div>

                <div>
                    <h3 data-testid="hotel-name">
                        {hotel.name}
                    </h3>

                    <p data-testid="hotel-location">
                        {hotel.location}
                    </p>
                </div>
            </Link>

            <div>
                <Link
                    to={`/hotels/${hotel.id}`}
                    data-testid="hotel-see-more"
                >
                    Voir plus
                </Link>
            </div>
        </div>
    );
}

export default HotelCard;