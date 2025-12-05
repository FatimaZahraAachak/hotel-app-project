import { useContext } from "react";
import Modal from "react-responsive-modal"
import 'react-responsive-modal/styles.css'
import { HotelContext } from "../context/HotelContext";
import { useNavigate } from "react-router-dom";

type ConfirmationModalProps = {
    id: number,
    open: boolean,
    onClose: () => void
    startDate: Date | null,
    endDate: Date | null
}

function ConfirmationModal({ open, onClose, id, startDate, endDate }: ConfirmationModalProps) {
    const ctx = useContext(HotelContext);
    const navigate = useNavigate();
    if (!ctx) {
        return <p>Erreur : HotelProvider manquant ⚠️</p>
    }
    const { hotels } = ctx;
    const hotel = hotels.find(h => id === h.id);
    if (!hotel) return null;


    const PriceTotal = () => {
        if (!endDate || !startDate) return;
        const one_day = 24 * 60 * 60 * 1000;
        const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / one_day);
        return nights * (hotel.price);
    }

    const goToReservation = () => {
        onClose();
        navigate("/my-reservations");
    }
    return (
        <Modal
            open={open}
            onClose={onClose}
            center
        >
            <div className="w-[500px] h-[400px] flex flex-col gap-5 items-center ">
                <h3 className="font-bold">Votre Réserver est confirmée </h3>
                <div>
                    <div>Hotel:{hotel.name}</div>
                    <div>Dates:{ }</div>
                    <div>{`Total Price:${PriceTotal()}£`}</div>
                </div>
                <button type='button' className='bg-blue-400 hover:bg-blue-500 border-gray-300 rounded-lg h-8 font-medium text-white px-4  ' onClick={goToReservation}>
                    Voire Mes Résevations
                </button>
            </div>
        </Modal>
    )
}
export default ConfirmationModal