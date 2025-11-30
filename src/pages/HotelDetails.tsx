import { Link, useParams } from "react-router-dom"
import { Hotels } from "../data/mockHotels";
import type { Hotel } from "../types";

// petit helper: mappe un amenity -> émoji sympa
const amenityIcon = (a: string) => {
    const key = a.toLowerCase();
    if (key.includes("wi-fi") || key.includes("wifi")) return "📶";
    if (key.includes("piscine") || key.includes("pool")) return "🏊";
    if (key.includes("spa")) return "💆";
    if (key.includes("parking")) return "🅿️";
    if (key.includes("petit déjeuner") || key.includes("breakfast")) return "🥐";
    if (key.includes("plage")) return "🏖️";
    if (key.includes("gym") || key.includes("fitness")) return "🏋️";
    if (key.includes("bar")) return "🍹";
    if (key.includes("restaurant")) return "🍽️";
    return "✨";
};

export default function HotelDetails() {
    const { id } = useParams();
    const found: Hotel | undefined = Hotels.find(h => h.id === id);

    if (!found) {
        return (
            <div className="mx-auto max-w-4xl px-6 py-16 text-center">
                <h1 className="text-2xl font-bold text-gray-900">Hôtel non trouvé</h1>
                <p className="mt-2 text-gray-600">
                    L’ID « {id} » ne correspond à aucun hôtel.
                </p>
                <Link
                    to="/"
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
                >
                    ← Retour à l’accueil
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-6 py-10">
            {/* fil d’ariane simple */}
            <div className="mb-6 flex items-center gap-2 text-sm">
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition">Accueil</Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 font-medium">{found.name}</span>
            </div>

            {/* image principale */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-md">
                <img
                    src={found.image}
                    alt={found.name}
                    className="h-[360px] w-full object-cover md:h-[460px]"
                    loading="eager"
                />
            </div>

            {/* bloc infos */}
            <section className="mt-8 grid gap-8 lg:grid-cols-5">
                {/* colonne texte */}
                <div className="lg:col-span-3">
                    <h1 className="text-2xl font-bold text-gray-900">{found.name}</h1>
                    <p className="mt-1 text-gray-600">{found.location}</p>

                    <div className="mt-4 flex flex-wrap items-center gap-4">
                        <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm shadow">
                            <span className="text-amber-500">★</span>
                            <span className="font-medium text-gray-800">
                                {found.rating.toFixed(1)}
                            </span>
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm shadow">
                            <span>💶</span>
                            <span className="font-medium text-gray-800">
                                {found.price} € / nuit
                            </span>
                        </div>
                    </div>

                    <p className="mt-6 text-gray-700 leading-relaxed">
                        {found.description}
                    </p>

                    {/* amenities */}
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold text-gray-900">Équipements</h2>
                        <ul className="mt-3 flex flex-wrap gap-2">
                            {found.amenities.map((a) => (
                                <li
                                    key={a}
                                    className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-800"
                                >
                                    <span>{amenityIcon(a)}</span>
                                    <span>{a}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* panneau action / réservation (placeholder) */}
                <aside className="lg:col-span-2">
                    <div className="rounded-2xl bg-white p-6 shadow-md">
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-gray-900">{found.price}€</span>
                            <span className="text-sm text-gray-500">/ nuit</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                            {found.rating.toFixed(1)} ★ · {found.location}
                        </p>
                        <button
                            className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition"
                            type="button"
                        >
                            Réserver maintenant
                        </button>
                        <button
                            className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50 transition"
                            type="button"
                        >
                            ♥ Ajouter aux favoris
                        </button>
                    </div>
                </aside>
            </section>
        </div>
    );
}
