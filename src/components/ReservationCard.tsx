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
    function formatDate(d: Date | null | string): string {
        if (!d) return '-';
        if (typeof d === 'string') {
            const date = new Date(d);
            return date.toLocaleDateString("fr-FR")
        }
        return d.toLocaleDateString("fr-FR");
    }
    const handleSubmit = () => {
        navigate(`/hotels/${id}`);
    }
    const handleDelet = () => {
        
    }

    return (
        <div className="h-full flex flex-col   rounded-2xl border border-gray-200 p-5 bg-white shadow-sm hover:shadow-md transition ">
            <div className="flex items-start gap-4 w-full min-w-0">

                <img src={found.image} alt={found.name} className="h-20 w-20 rounded-xl object-cover ring-1 ring-gray-200"
                    loading="eager" />

                <div className="flex-1 min-w-0 ">
                    <div className="font-semibold text-gray-900 truncate text-base">{found.name}</div>
                    <div className="mt-1 text-sm text-gray-600">{formatDate(res.startDate) ? formatDate(res.startDate) : '-'} - {formatDate(res.endDate) ? formatDate(res.endDate) : '-'} </div>
                    <div className="mt-3 inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-900 ring-1 ring-gray-200">{`${res.totalPrice}€`}</div>
                </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
                <button type='button' className=" w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition " onClick={handleSubmit}>Voir details </button>
                <button type='button' className=" w-full rounded-xl bg-blue-300 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition " >Annuler </button>
            </div>
        </div>
    )
}
export default ReservationCard