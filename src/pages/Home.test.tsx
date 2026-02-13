import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import Home from "./Home";
import { SearchContext } from "../context/SearchContext";


vi.mock("../components/HotelSearchResults", () => ({
    default: () => <div>MOCK_SEARCH_RESULTS</div>
}));

vi.mock("../components/HotelsList", () => ({
    default: () => <div>MOCK_HOTELS_LIST</div>
}));

describe("Home", () => {
    test("affiche les titres en cas ou aucun des deux n’est rempli ", () => {
        render(
            <SearchContext.Provider value={{ searchTerm: "", setSearchTerm: vi.fn(), country: "", setCountry: vi.fn() }}>
                <Home />
            </SearchContext.Provider>
        );
        expect(screen.getByText("Trouvez votre prochain séjour")).toBeInTheDocument();
        expect(screen.getByText("Recherchez les meilleurs hôtels et profitez des meilleures offres.")).toBeInTheDocument();
        expect(screen.getByText("Hôtels populaires")).toBeInTheDocument();
        expect(screen.getByText("Découvrez notre sélection du moment.")).toBeInTheDocument();
        expect(screen.queryByText("Résultats")).not.toBeInTheDocument();
        expect(screen.queryByText(/Résultats pour/i)).not.toBeInTheDocument();

    });

    test("Au moins l’un des deux est rempli ", () => {
        render(
            <SearchContext.Provider value={{ searchTerm: "", setSearchTerm: vi.fn(), country: "France", setCountry: vi.fn() }}>
                <Home />
            </SearchContext.Provider>
        );
        expect(screen.getByText("Trouvez votre prochain séjour")).toBeInTheDocument();
        expect(screen.getByText("Recherchez les meilleurs hôtels et profitez des meilleures offres.")).toBeInTheDocument();
        expect(screen.getByText("Résultats")).toBeInTheDocument();
        expect(screen.getByText("Résultats pour France")).toBeInTheDocument();
        expect(screen.queryByText("Hôtels populaires")).not.toBeInTheDocument();
        expect(
            screen.queryByText(/Découvrez notre sélection du moment/i)
        ).not.toBeInTheDocument();

    });
    test("CONTEXTE MANQUANT ", () => {
        render(

            <Home />

        );
        expect(screen.getByText("Erreur : SearchProvider manquant ⚠️")).toBeInTheDocument();

    });

});
