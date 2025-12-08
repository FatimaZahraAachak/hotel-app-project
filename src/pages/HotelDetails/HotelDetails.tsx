import { Link, useParams } from "react-router-dom";
import type { Hotel } from "../../types";
import { useContext } from "react";
import { HotelContext } from "../../context/HotelContext";

import Header from "./Header";
import Equipments from "./Equipments";
import Informations from "./Informations";
import Footer from "./Footer";

export default function HotelDetails() {
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
            <Header found={found} />
            <section className="mt-6 md:mt-8 grid gap-6 lg:grid-cols-5 lg:gap-8">
                <div className="lg:col-span-3">
                    <Informations found={found} />
                    <Equipments found={found} />
                </div>
                <aside className="lg:col-span-2">
                    <Footer found={found} />
                </aside>
            </section>
        </div>
    );
}
