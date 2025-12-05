import { useContext } from "react";
import Modal from "react-responsive-modal"
import 'react-responsive-modal/styles.css'
import { HotelContext } from "../context/HotelContext";

type ConfirmationModalProps = {
    id: number,
    open: boolean,
    onClose: () => void
    startDate: Date | null,
    endDate: Date | null
}

function ConfirmationModal({ open, onClose, id, startDate, endDate }: ConfirmationModalProps) {
    const ctx = useContext(HotelContext);
    if (!ctx) {
        return <p>Erreur : HotelProvider manquant ⚠️</p>
    }
    const { hotels } = ctx;


    const PriceTotal = () => {
        if (!endDate || !startDate) return;
        const one_day = 24 * 60 * 60 * 1000;
        const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / one_day);
        return nights * (hotels[id].price);
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
                    <div>Hotel:{hotels[id].name}</div>
                    <div>Dates:</div>
                    <div>{`Total Price:${PriceTotal()}£`}</div>
                </div>
            </div>
        </Modal>
    )
}
export default ConfirmationModal