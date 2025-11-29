import HotelCard from "../components/HotelCard"
import { Hotels } from "../data/mockHotels"

function Home() {

    return (
        <div className="mx-auto max-w-6xl px-4 py-6">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">Hôtels</h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Hotels.map(hotel => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                ))}
            </div>
        </div>
    );

}
export default Home