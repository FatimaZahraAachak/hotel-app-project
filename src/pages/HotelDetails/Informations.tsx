import type { Hotel } from "../../types";

type InformationsProps = {
    hotel: Hotel;
};

function Informations({ hotel }: InformationsProps) {
    return (
        <div>
            <h1
                data-testid="hotel-name"
                className="text-xl md:text-2xl font-bold text-gray-900"
            >
                {hotel.name}
            </h1>

            <p
                data-testid="hotel-location"
                className="mt-1 text-gray-600"
            >
                {hotel.location}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
                {/* Rating */}
                <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm shadow-sm">
                    <span className="text-amber-500">★</span>
                    <span
                        data-testid="hotel-rating"
                        className="font-medium text-gray-800"
                    >
                        {hotel.rating.toFixed(1)}
                    </span>
                </div>

                {/* Price */}
                <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm shadow-sm">
                    <span>💶</span>
                    <span
                        data-testid="hotel-price"
                        className="font-medium text-gray-800"
                    >
                        {hotel.price} € / nuit
                    </span>
                </div>
            </div>

            <p
                data-testid="hotel-description"
                className="mt-5 md:mt-6 text-gray-700 leading-relaxed"
            >
                {hotel.description}
            </p>
        </div>
    );
}

export default Informations;

