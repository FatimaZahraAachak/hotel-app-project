import type { Hotel } from "../../types"

type InformationsProps = {
    found: Hotel
}
function Informations({ found }: InformationsProps) {
    return (<div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">{found.name}</h1>
        <p className="mt-1 text-gray-600">{found.location}</p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm shadow-sm">
                <span className="text-amber-500">★</span>
                <span className="font-medium text-gray-800">{found.rating.toFixed(1)}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm shadow-sm">
                <span>💶</span>
                <span className="font-medium text-gray-800">{found.price} € / nuit</span>
            </div>
        </div>

        <p className="mt-5 md:mt-6 text-gray-700 leading-relaxed">{found.description}</p>
    </div>)
}
export default Informations