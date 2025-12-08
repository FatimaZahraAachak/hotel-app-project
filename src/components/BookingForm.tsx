import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { BookingContext } from '../context/BookingContext';
import ConfirmationModal from './ConfirmationModal';

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
        const newReservation = {
            id: Date.now(),
            hotelId: id,
            startDate: startDate,
            endDate: endDate,
            guestName: name.trim(),
            totalPrice: finalPrice
        }
        console.log(newReservation);
        addReservation(newReservation);

    }



    return (
        <form onSubmit={handleSubmit} className='flex h-full  flex-col  gap-2 md:gap-3'>
            {/* Dates */}
            <div className='flex flex-col gap-3   md:flex-row md:gap-5' >
                <div className='flex flex-col'>
                    <label className='font-medium'>Date d’arrivée</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date);
                        }}
                        minDate={new Date()}
                        placeholderText="Choisissez une date"
                        className=' border border-gray-300 rounded-md p-1'

                    />
                </div>

                <div className='flex flex-col md:ml-auto'>
                    <label className='font-medium'>Date de départ</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        disabled={!startDate}
                        minDate={startDate ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000) : undefined}
                        placeholderText="Choisissez une date"
                        className=' border border-gray-300 rounded-md p-1'
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
                    className='border border-gray-300 rounded-md p-1'
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
                    className='border border-gray-300 rounded-md p-1'
                />
            </div>

            {/* Actions */}

            <button className='bg-blue-400 hover:bg-blue-500 border-gray-300 rounded-lg h-8 font-medium text-white px-4 mx-auto mt-auto'
                type="submit" onClick={onOpenModal}
            >
                Confirmer la réservation
            </button>
            <ConfirmationModal open={open} onClose={onCloseModal} id={id} startDate={startDate} endDate={endDate} />


        </form>
    );
}
export default BookingForm