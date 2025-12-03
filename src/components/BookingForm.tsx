import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function BookingForm() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [name, setName] = useState<string>("");
    const [guests, setGuests] = useState<number>(1);
    const handleSubmit = (e: any) => {
        e.preventDefault();
    }
    return (
        <form onSubmit={handleSubmit} >
            {/* Dates */}
            <div >
                <div>
                    <label>Date d’arrivée</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date);
                        }}
                        minDate={new Date()}
                        placeholderText="Choisissez une date"

                    />
                </div>

                <div>
                    <label>Date de départ</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        disabled={!startDate}
                        minDate={startDate ? startDate : undefined}
                        placeholderText="Choisissez une date"
                    />
                </div>
            </div>

            {/* Nom */}
            <div>
                <label >Nom</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom complet"
                />
            </div>

            {/* Invités */}
            <div>
                <label >Invités</label>
                <input
                    type="number"
                    min={1}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                />
            </div>

            {/* Actions */}
            <div>
                <button
                    type="submit"
                >
                    Confirmer la réservation
                </button>
            </div>
        </form>
    );
}
export default BookingForm