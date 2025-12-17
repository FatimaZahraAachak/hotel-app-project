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
    function formatDate(d: Date | null): string {
        if (!d) return '-';
        return d.toLocaleDateString("fr-FR");
    }
    return (
        <Modal
            open={open}
            onClose={onClose}
            center
            classNames={{
                overlay: "bg-black/50 backdrop-blur-sm",
                modal: "bg-white rounded-2xl shadow-xl p-6 md:p-7 transition-all max-w-md",
                closeButton: "absolute top-3 right-3 text-gray-500 hover:text-gray-700",
            }}
        >
            <div className=" flex flex-col gap-4 items-center md:gap-6 text-center ">
                <div className="inline-flex items-center justify-center rounded-full bg-green-100 text-green-600 w-10 h-10 md:w-12 md:h-12 mb-1">
                    ✓
                </div>

                <h3 className="font-semibold text-lg md:text-xl text-gray-900 ">Votre Réserver est confirmée! </h3>
                <p className="text-sm text-gray-600 max-w-sm">
                    Merci pour votre confiance. Voici un récapitulatif de votre séjour :
                </p>
                <div className="w-full  bg-blue-50 border border-blue-100 rounded-xl p-3 md:p-4 md:w-max md:h-max text-sm md:text-base text-left space-y-2  ">
                    <div>
                        <span className="font-semibold text-gray-900">Hôtel :</span>{" "}
                        <span className="text-gray-800">{hotel.name}</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-900">Dates :</span>{" "}
                        <span className="text-gray-800">
                            du {formatDate(startDate)} au {formatDate(endDate)}
                        </span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-900">Total :</span>{" "}
                        <span className="text-gray-900">{PriceTotal()} €</span>
                    </div>
                </div>
                <button type='button' className='mt-5 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition  ' onClick={goToReservation}>
                    Voire Mes Résevations
                </button>
            </div>
        </Modal>
    )
}
export default ConfirmationModal