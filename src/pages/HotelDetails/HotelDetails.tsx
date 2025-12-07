import { Link, useParams } from "react-router-dom";
import type { Hotel } from "../../types";
import { useContext, useState } from "react";
import { HotelContext } from "../../context/HotelContext";
import BookingMoadl from "../../components/BookingModal";
import { amenityIcon } from "./amenityIcon ";

export default function HotelDetails() {
    const [open, setOpen] = useState<boolean>(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const ctx = useContext(HotelContext);
    if (!ctx) {
        return <p>Erreur : HotelProvider manquant ⚠️</p>
    }
    const { getHotelById } = ctx;

    const { id: _id } = useParams();
    const id = Number(_id);
    const found: Hotel | undefined = id ? getHotelById(id) : undefined;

    if (!found) {
        return (
            <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 text-center">
                <h1 className="text-2xl font-bold text-gray-900">Hôtel non trouvé</h1>
                <p className="mt-2 text-gray-600">L’ID « {id} » ne correspond à aucun hôtel.</p>
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
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:py-10">
            <div className="mb-5 md:mb-6 flex items-center gap-2 text-sm">
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition">
                    Accueil
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 font-medium">{found.name}</span>
            </div>
            <div className="overflow-hidden rounded-2xl bg-white shadow-md">
                <img
                    src={found.image}
                    alt={`${found.name} — ${found.location}`}
                    className="h-[260px] w-full object-cover md:h-[360px] lg:h-[460px]"
                    loading="eager"
                />
            </div>
            <section className="mt-6 md:mt-8 grid gap-6 lg:grid-cols-5 lg:gap-8">
                <div className="lg:col-span-3">
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

                    <div className="mt-6 md:mt-8">
                        <h2 className="text-base md:text-lg font-semibold text-gray-900">Équipements</h2>
                        <ul className="mt-3 flex flex-wrap gap-2">
                            {found.amenities.map((a) => (
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
                </div>

                <aside className="lg:col-span-2">
                    <div className="rounded-2xl bg-white p-5 md:p-6 shadow-md lg:sticky lg:top-24">
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-gray-900">{found.price}€</span>
                            <span className="text-sm text-gray-500">/ nuit</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                            {found.rating.toFixed(1)} ★ · {found.location}
                        </p>
                        <button
                            className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition"
                            type="button" onClick={onOpenModal}
                        >
                            Réserver maintenant
                        </button>
                        <BookingMoadl open={open}
                            onClose={onCloseModal} id={id} price={found.price} />
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
