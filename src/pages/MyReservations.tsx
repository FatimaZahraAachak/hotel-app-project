import { useContext } from "react";
import { BookingContext } from "../context/BookingContext";
import ReservationCard from "../components/ReservationCard";

function MyReservations() {
    const ctx = useContext(BookingContext);
    if (!ctx) {
        return <p>Erreur : BookingProvider manquant ⚠️</p>
    }
    const { reservations } = ctx;
    const hasData = reservations.length > 0;

    return (
        <div className="mx-auto max-w-5xl px-4 py-6 md:px-6 lg:py-10 ">
            <header className="mb-6 md:mb-8">
                <h1 className="text-xl md:text-2xl font-bold text-blue-500">Your Reservations</h1>
                <p className="mt-1 text-sm text-gray-600">
                    {hasData
                        ? `${reservations.length} réservation(s) enregistrée(s)`
                        : "Vous n’avez pas encore de réservation."}
                </p>
            </header>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 " >
                {hasData ? (
                    reservations.map((res) => (
                        <div key={res.id} className="h-full">
                            <ReservationCard res={res} />
                        </div>
                    ))
                ) : (
                        <div className="col-span-full rounded-2xl bg-white p-8 text-center text-gray-600 shadow-sm border border-gray-100">
                        Aucune donnée disponible pour le moment.
                    </div>
                )}
            </div>
        </div>
    )
}
export default MyReservations