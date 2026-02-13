import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import HotelSearchResults from "../components/HotelSearchResults";
import HotelsList from "../components/HotelsList";
import SearchBar from "../components/SearchBar";

 function Home() {
    const searchcontext = useContext(SearchContext);
    if (!searchcontext) {
        return <p>Erreur : SearchProvider manquant ⚠️</p>;
    }
    const { searchTerm, country } = searchcontext;
    const hasQuery = searchTerm.trim().length > 0 || country.trim().length > 0;
    const term = searchTerm.trim();
    const c = country.trim();
    const label =
        term && c ? `${term}-${c}` :
            term ? term :
                c;
    return (
        <div>
            <section className="relative overflow-hidden">
                <div className="h-[340px] md:h-[420px] w-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80')]" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/10" />
                <div className="absolute inset-0 flex items-center">
                    <div className="mx-auto w-full max-w-4xl px-4">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                            Trouvez votre prochain séjour
                        </h1>
                        <p className="mt-3 text-white/90 text-sm md:text-base">
                            Recherchez les meilleurs hôtels et profitez des meilleures offres.
                        </p>
                        <div className="mt-6 max-w-2xl">
                            <SearchBar />
                        </div>
                    </div>
                </div>
            </section>
            <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
                <header className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-blue-500">
                        {hasQuery ? "Résultats" : "Hôtels populaires"}
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        {hasQuery
                            ? `Résultats pour ${label}`
                            : "Découvrez notre sélection du moment."}
                    </p>
                </header>

                {hasQuery ? <HotelSearchResults searchTerm={searchTerm} country={country} /> : <HotelsList />}
            </main>
        </div>
    );
}

export default Home;
