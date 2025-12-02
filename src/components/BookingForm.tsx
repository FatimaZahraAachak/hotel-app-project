import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function BookingForm() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [name, setName] = useState<string>("");
    const [guests, setGuests] = useState<number>(1);
    const handleSubmit = () => {

    }
    return <form onSubmit={handleSubmit}>
        <div>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
            />
            <DatePicker
                disabled={!startDate}
                selected={endDate}
                onChange={(date) => setEndDate(date)}
            />
        </div>
        <div>
            <label>
                Nom :
                <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
            </label>
        </div>
        <div>
            <label>
                Number of Guests :
                <input type="number" min={1} name="number-of-guests" value={guests} onChange={e => setGuests(Number(e.target.value))} />
            </label>
        </div>
        <button type="submit">confirm booking</button>
    </form>
}
export default BookingForm