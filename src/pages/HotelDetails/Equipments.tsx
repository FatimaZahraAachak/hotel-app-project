import type { Hotel } from "../../types"
import { amenityIcon } from "./amenityIcon "

type EquipmentsProps = {
    hotel: Hotel
}
function Equipments({ hotel }: EquipmentsProps) {
    return (
        <div className="mt-6 md:mt-8">
            <h2 className="text-base md:text-lg font-semibold text-gray-900">Équipements</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
                {hotel.amenities.map((a) => (
                    <li
                        key={a}
                        className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-800 ring-1 ring-gray-200"
                    >
                        <span>{amenityIcon(a)}</span>
                        <span>{a}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Equipments