import { useContext } from "react";
import { BookingContext } from "../context/BookingContext";

function MyReservations() {
    const ctx = useContext(BookingContext);
    if (!ctx) {
        return <p>Erreur : BookingProvider manquant ⚠️</p>
    }
    const { reservations } = ctx;

    return (
        <div>
            <header className="mb-6 md:mb-8">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Hôtels</h1>
            </header>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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