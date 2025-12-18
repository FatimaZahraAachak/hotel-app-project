import Modal from "react-responsive-modal";
import type { Reservation } from "../types";
import { useContext } from "react";
import { BookingContext } from "../context/BookingContext";
type RemoveReservationModalProps = {
    res: Reservation,
    open: boolean,
    onClose: () => void
}
function RemoveReservationModal({ res, open, onClose }: RemoveReservationModalProps) {
    const ctx = useContext(BookingContext);
    if (!ctx) {
        return <p>Erreur : FavoriteProvider manquant ⚠️</p>
    }
    const { removeReservation } = ctx;

    const handleRemoveFavrorite = () => {
        removeReservation(res.id);
        onClose();
    }
    return (<Modal
        open={open}
        onClose={onClose}
        center
        classNames={{
            overlay: "bg-black/50 backdrop-blur-sm",
            modal: "bg-white rounded-2xl shadow-xl p-6 md:p-7 transition-all max-w-md w-full",
            closeButton: "absolute top-3 right-3 text-gray-500 hover:text-gray-700",
        }}
    >
        <div className="flex flex-col gap-4 text-center">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                !
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                Confirmer l’annulation ?
            </h3>
            <p className="text-sm text-gray-600">
                Cette action est définitive. Voulez-vous vraiment annuler cette réservation ?
            </p>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-left">
                <div className="text-sm text-gray-600">Réservation</div>
                <div className="mt-1 font-medium text-gray-900">
                    ID : {res.id}
                </div>
                <div className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-900 ring-1 ring-gray-200">
                    Total : {res.totalPrice}€
                </div>
            </div>
            <div className="mt-1 flex flex-col gap-2">

                <button
                    type="button"
                    onClick={handleRemoveFavrorite}
                    className="w-full rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 transition shadow-sm"
                >
                    Oui, annuler la réservation
                </button>


                <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50 transition"
                >
                    Retour
                </button>
            </div>
            <p className="text-xs text-gray-500">
                Vous pourrez réserver à nouveau à tout moment.
            </p>
        </div>

    </Modal>)
}
export default RemoveReservationModal;