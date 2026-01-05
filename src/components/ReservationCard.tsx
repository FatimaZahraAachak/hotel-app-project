import { useContext, useState } from "react";
import { HotelContext } from "../context/HotelContext";
import type { Reservation } from "../types"
import { useNavigate } from "react-router-dom";
import RemoveReservationModal from "./RemoveReservationModal";

type ReservationCardProps = {
    res: Reservation
}
function ReservationCard({ res }: ReservationCardProps) {
    const [open, setOpen] = useState<boolean>(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const navigate = useNavigate();
    const ctx = useContext(HotelContext);
    if (!ctx) {
        return <p>Erreur : HotelProvider manquant ⚠️</p>
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
        navigate(`/hotels/${hotel.id}`);
    }
    const handleDelet = () => {
        onOpenModal();
    }
    const hotel = res.hotel
    return (
        <div className="h-full flex flex-col   rounded-2xl border border-gray-200 p-5 bg-white shadow-sm hover:shadow-md transition ">
            <div className="flex items-start gap-4 w-full min-w-0">

                <img src={hotel.image} alt={hotel.name} className="h-full w-20 rounded-xl object-cover ring-1 ring-gray-200"
                    loading="eager" />

                <div className="flex-1 min-w-0 ">
                    <div className="font-semibold text-gray-900 truncate text-base">{hotel.name}</div>
                    <div className="mt-1 text-sm text-gray-600">{formatDate(res.startDate) ? formatDate(res.startDate) : '-'} - {formatDate(res.endDate) ? formatDate(res.endDate) : '-'} </div>
                    <div className="mt-3 inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-900 ring-1 ring-gray-200">{`${res.totalPrice}€`}</div>
                </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
                <button type='button' className=" w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition " onClick={handleSubmit}>Voir details </button>
                <button type='button' className=" w-full rounded-xl bg-blue-300 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition " onClick={handleDelet} >Annuler </button>
                <RemoveReservationModal open={open} onClose={onCloseModal} res={res} hotel={hotel} />
            </div>
        </div>
    )
}
export default ReservationCard