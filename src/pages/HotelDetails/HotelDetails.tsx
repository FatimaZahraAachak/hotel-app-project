import { Link, useParams } from "react-router-dom";
import type { Hotel } from "../../types";
import { useContext, useEffect, useState } from "react";
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
    const [hotel, setHotel] = useState<Hotel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { id: _id } = useParams();
    const id = Number(_id);
    useEffect(() => {
        async function loadHotel() {
            const result = await getHotelById(id);
            setHotel(result);
            setLoading(false);
        }
        loadHotel();

    }, [id, getHotelById])

    if (loading) {
        return (
            <div className="rounded-xl border p-6 text-center text-gray-500">
                Chargement de l’hôtel...
            </div>
        );
    }


    if (!hotel) {
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
            <Header hotel={hotel} />
            <section className="mt-6 md:mt-8 grid gap-6 lg:grid-cols-5 lg:gap-8">
                <div className="lg:col-span-3">
                    <Informations hotel={hotel} />
                    <Equipments hotel={hotel} />
                </div>

                <aside className="lg:col-span-2">
                    <Footer hotel={hotel} />
                </aside>
            </section>
        </div>
    );
}
