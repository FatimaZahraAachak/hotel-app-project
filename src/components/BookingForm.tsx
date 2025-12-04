import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { BookingContext } from '../context/BookingContext';

type BookingFormProps = {
    id: number
}

function BookingForm({ id }: BookingFormProps) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [name, setName] = useState<string>("");
    const [guests, setGuests] = useState<number>(1);
    const ctx = useContext(BookingContext);
    if (!ctx) {
        return <p>Erreur : BookingProvider manquant ⚠️</p>
    }
    const { addReservation } = ctx;

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!startDate || !endDate) return;
        if (endDate <= startDate) return;
        if (name.trim()) return;
        addReservation(newReservation);

    }
    const newReservation = {
        id: Date.now(),
        hotelId: id,
        startDate: startDate,
        endDate: endDate,
        guestName: name.trim(),
        totalPrice: 100
    }
    console.log(newReservation);
    return (
        <form onSubmit={handleSubmit} className='flex  flex-col items-center gap-3'>
            {/* Dates */}
            <div className='flex flex-row gap-5' >
                <div>
                    <label className='font-medium'>Date d’arrivée</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date);
                        }}
                        minDate={new Date()}
                        placeholderText="Choisissez une date"
                        className=' border border-gray-300'

                    />
                </div>

                <div>
                    <label className='font-medium'>Date de départ</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        disabled={!startDate}
                        minDate={startDate ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000) : undefined}
                        placeholderText="Choisissez une date"
                        className=' border border-gray-300'
                    />
                </div>
            </div>

            {/* Nom */}
            <div className='flex flex-row gap-5'>
                <label className='font-medium' >Nom</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom complet"
                    className='border border-gray-300'
                />
            </div>

            {/* Invités */}
            <div className='flex flex-row gap-5'>
                <label className='font-medium' >Invités</label>
                <input
                    type="number"
                    min={1}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className='border border-gray-300'
                />
            </div>

            {/* Actions */}
            <div>
                <button className='bg-blue-400 hover:bg-blue-500 border-gray-300 rounded-lg h-8 font-medium text-white px-4  '
                    type="submit"
                >
                    Confirmer la réservation
                </button>
            </div>
        </form>
    );
}
export default BookingForm