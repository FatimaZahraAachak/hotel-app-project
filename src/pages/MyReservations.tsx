import { useContext } from "react";
import { BookingContext } from "../context/BookingContext";
import ReservationCard from "../components/ReservationCard";

function MyReservations() {
    const ctx = useContext(BookingContext);
    if (!ctx) {
        return <p>Erreur : BookingProvider manquant ⚠️</p>
    }
    const { reservations } = ctx;

    return (
        <div className="flex flex-col items-center ">
            <header className="mb-6 md:mb-8">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Your Reservations</h1>
            </header>

            <div className="flex flex-col gap-5 " >
                {reservations ? (
                    reservations.map((res) => (
                        <div key={res.id} className="h-full">
                            <ReservationCard res={res} />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full rounded-2xl bg-white p-8 text-center text-gray-600 shadow">
                        Aucune donnée disponible pour le moment.
                    </div>
                )}
            </div>
        </div>
    )
}
export default MyReservations