import { useContext, useState } from "react";
import type { Hotel } from "../../types"
import BookingModal from "../../components/BookingModal";
import { AuthContext } from "../../context/AuthContext";
import { FavoritesButtondetail } from "./FavoritesButtonDetail";
import { FavoritesButtonNotUser } from "./FavoritesButtonNotUser";
import { useNavigate } from "react-router";

type FooterProps = {
    hotel: Hotel
}
function Footer({ hotel }: FooterProps) {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const [open, setOpen] = useState<boolean>(false);
    if (!authContext) {
        return <p>Erreur : FavoriteProvider manquant ⚠️</p>
    }
    const { user } = authContext;
    const onOpenModal = () => {
        if (user) {
            setOpen(true);
        }
        else navigate("/login")
    }
    const onCloseModal = () => setOpen(false);
    if (!authContext) {
        return <p>Erreur : FavoriteProvider manquant ⚠️</p>
    }
    return (
        <div className="rounded-2xl bg-white p-5 md:p-6 shadow-md lg:sticky lg:top-24">
            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">{hotel.price}€</span>
                <span className="text-sm text-gray-500">/ nuit</span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
                {hotel.rating.toFixed(1)} ★ · {hotel.location}
            </p>
            <button
                className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition"
                type="button" onClick={onOpenModal}
            >
                Réserver maintenant
            </button>
            {user ? <BookingModal open={open}
                onClose={onCloseModal} id={hotel.id} price={hotel.price} userId={user.id} /> : null}

            {user ? <FavoritesButtondetail userId={user.id} hotel={hotel} /> : <FavoritesButtonNotUser />}
        </div >
    )
}
export default Footer