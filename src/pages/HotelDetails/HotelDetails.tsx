import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import Equipments from "./Equipments";
import Informations from "./Informations";
import Footer from "./Footer";
import { useGetHotelById } from "../../queries/hotels";

export default function HotelDetails() {

    const { id: _id } = useParams();
    const id = Number(_id);
    const { isPending, data, error } = useGetHotelById(id);
    if (isPending) {
        return <p className="col-span-full rounded-2xl bg-white p-8 text-center text-gray-600 shadow">Chargement des favoris...</p>
    }
    if (error) {
        return <p className="col-span-full rounded-2xl bg-white p-8 text-center text-gray-600 shadow">Erreur lors du chargement des favoris</p>
    }
    const hotel = data;

   
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
