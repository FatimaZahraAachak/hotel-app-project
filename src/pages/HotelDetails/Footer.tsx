import { useState } from "react";
import type { Hotel } from "../../types"
import BookingModal from "../../components/BookingModal";

type FooterProps = {
    found: Hotel
}
function Footer({ found }: FooterProps) {
    const [open, setOpen] = useState<boolean>(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    return (
        <div className="rounded-2xl bg-white p-5 md:p-6 shadow-md lg:sticky lg:top-24">
            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">{found.price}€</span>
                <span className="text-sm text-gray-500">/ nuit</span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
                {found.rating.toFixed(1)} ★ · {found.location}
            </p>
            <button
                className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition"
                type="button" onClick={onOpenModal}
            >
                Réserver maintenant
            </button>
            <BookingModal open={open}
                onClose={onCloseModal} id={found.id} price={found.price} />
            <button
                className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50 transition"
                type="button"
            >
                ♥ Ajouter aux favoris
            </button>
        </div>
    )
}
export default Footer