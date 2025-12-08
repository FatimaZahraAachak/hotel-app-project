import { useContext } from "react";
import { HotelContext } from "../context/HotelContext";
import type { Hotel, Reservation } from "../types"
import { Link, useNavigate } from "react-router-dom";

type ReservationCardProps = {
    res: Reservation
}
function ReservationCard({ res }: ReservationCardProps) {
    const navigate = useNavigate();
    const ctx = useContext(HotelContext);
    if (!ctx) {
        return <p>Erreur : HotelProvider manquant ⚠️</p>
    }
    const { getHotelById } = ctx;
    const id = res.hotelId;
    const found: Hotel | undefined = id ? getHotelById(id) : undefined;
    if (!found) {
        return (
            <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 text-center">
                <h1 className="text-2xl font-bold text-gray-900">Hôtel non trouvé</h1>
                <p className="mt-2 text-gray-600">L’ID « {id} » ne correspond à aucun hôtel.</p>
                <Link
                    to="/"
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
                >
                    ← Retour à l’accueil
                </Link>
            </div>
        );
    }
    function formatDate(d: Date | null): string {
        if (!d) return '-';
        return d.toLocaleDateString("fr-FR");
    }
    const handleSubmit = () => {
        navigate(`/hotels/${id}`);
    }

    return (
        <div className="flex flex-col gap-10 items-center border  rounded-2xl border-gray-300 p-3 bg-white md:flex-row ">
            <div className="flex gap-6">
                <div>
                    <img src={found.image} className="h-16 rounded-lg"
                        loading="eager" />
                </div>
                <div className="flex flex-col ">
                    <div className="font-bold truncate w-60">{found.name}</div>
                    <div className="text-sm">{formatDate(res.startDate) ? formatDate(res.startDate) : '-'} - {formatDate(res.endDate) ? formatDate(res.endDate) : '-'} </div>
                    <div className="font-medium">{`${res.totalPrice}€`}</div>
                </div>
            </div>
            <button type='button' className="bg-blue-400 hover:bg-blue-500 border-gray-300 rounded-lg h-8 font-medium text-white px-4 " onClick={handleSubmit}>Voir details </button>
        </div>
    )
}
export default ReservationCard