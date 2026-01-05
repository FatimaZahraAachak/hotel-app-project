import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { BookingContext } from '../context/BookingContext';
import ConfirmationModal from './ConfirmationModal';
import type { NewReservation } from '../types';

type BookingFormProps = {
    id: number
    price: number
}

function BookingForm({ id, price }: BookingFormProps) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [name, setName] = useState<string>("");
    const [guests, setGuests] = useState<number>(1);
    const [open, setOpen] = useState<boolean>(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const ctx = useContext(BookingContext);
    if (!ctx) {
        return <p>Erreur : BookingProvider manquant ⚠️</p>
    }
    const { addReservation } = ctx;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!startDate || !endDate) return;
        if (endDate <= startDate) return;
        if (!name.trim()) return;
        const one_day = 24 * 60 * 60 * 1000;
        const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / one_day);
        const finalPrice = nights * price;
        const newReservation: NewReservation = {
            hotelId: id,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            guestName: name.trim(),
            totalPrice: finalPrice
        }
        addReservation(newReservation);
        onOpenModal();
    }
    const isFormValid = startDate && endDate && name.trim();



    return (
        <form onSubmit={handleSubmit} className="flex h-full flex-col gap-3 md:gap-4 text-sm text-gray-800">
            {/* Dates */}
            <div className='flex flex-col gap-3   md:flex-row md:gap-5' >
                <div className='flex flex-col gap-1 w-full'>
                    <label className='font-medium text-gray-900'>Date d’arrivée</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date);
                        }}
                        minDate={new Date()}
                        placeholderText="Choisissez une date"
                        className=' border border-gray-300 rounded-md px-3 py-2px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400'

                    />
                </div>

                <div className='flex flex-col gap-1 md:ml-auto w-full'>
                    <label className='font-medium text-gray-900'>Date de départ</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        disabled={!startDate}
                        minDate={startDate ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000) : undefined}
                        placeholderText="Choisissez une date"
                        className=' border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 disabled:bg-gray-100'
                    />
                </div>
            </div>

            {/* Nom */}
            <div className='flex flex-col'>
                <label className='font-medium' >Nom</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom complet"
                    className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 w-full max-w-[160px]'
                />
            </div>

            {/* Invités */}
            <div className='flex flex-col'>
                <label className='font-medium' >Invités</label>
                <input
                    type="number"
                    min={1}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full max-w-[160px]'
                />
            </div>

            {/* Actions */}
            <div className='mt-3 md:mt-4 flex flex-col items-center gap-2'>
                <button className={`mt-5 w-full rounded-xl  px-4 py-2.5 text-sm font-medium text-white ${isFormValid ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    type="submit">Confirmer la réservation</button>
                <p className="text-xs text-gray-500 text-center">
                    Vous ne serez pas débité immédiatement. La confirmation complète vous sera envoyée par email.
                </p>
            </div>
            <ConfirmationModal open={open} onClose={onCloseModal} id={id} startDate={startDate} endDate={endDate} />


        </form>
    );
}
export default BookingForm