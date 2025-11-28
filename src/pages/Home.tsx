import HotelCard from "../components/HotelCard"
import { Hotels } from "../data/mockHotels"

function Home() {

    return (
        <div>
            {Hotels.map((hotel) => (
                <HotelCard hotel={hotel} key={hotel.id} />
            ))}
        </div>
    )

}
export default Home