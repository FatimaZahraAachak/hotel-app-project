import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import HotelDetails from "./HotelDetails";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import type { Hotel } from "../../types";

/**
 * TESTS D'INTÉGRATION pour HotelDetails
 *
 * Différence avec le test unitaire :
 * - ❌ On ne mocker PAS les composants enfants (Header, Informations, Equipments, Footer)
 * - ✅ On mocker SEULEMENT le hook useGetHotelById
 *
 * Pourquoi ? Parce qu'on teste que les VRAIS composants communiquent bien ensemble,
 * pas juste que HotelDetails les appelle.
 */

/* Mock du hook useGetHotelById */
vi.mock("../../queries/hotels", () => ({
    useGetHotelById: vi.fn(),
}));

/* Mock du hook useNavigate (car Footer l'utilise) */
vi.mock("react-router", () => ({
    ...vi.importActual("react-router"),
    useNavigate: () => vi.fn(),
}));

import { useGetHotelById } from "../../queries/hotels";
const mockUseGetHotelById = vi.mocked(useGetHotelById);

// Faux hôtel pour les tests
const fakeHotel: Hotel = {
    id: 1,
    name: "Hotel de Luxe Paris",
    location: "75001 Paris, France",
    price: 250,
    rating: 4.8,
    image: "https://example.com/hotel.jpg",
    description: "Un magnifique hôtel 5 étoiles en plein cœur de Paris",
    amenities: ["Wi-Fi", "Piscine", "Spa", "Restaurant"],
};

describe("HotelDetails - INTÉGRATION", () => {

    test("affiche correctement toutes les informations de l'hôtel avec les vrais composants", () => {
        // Mock du hook pour retourner le faux hôtel
        mockUseGetHotelById.mockReturnValue({
            isPending: false,
            error: null,
            data: fakeHotel,
        });

        // Render avec routing (important : l'ID doit correspondre)
        render(
            <MemoryRouter initialEntries={["/hotels/1"]}>
                <Routes>
                    <Route path="/hotels/:id" element={<HotelDetails />} />
                </Routes>
            </MemoryRouter>
        );

        // Vérifier que le nom de l'hôtel s'affiche dans Informations
        expect(screen.getByTestId("hotel-name")).toBeInTheDocument();
        expect(screen.getByTestId("hotel-name")).toHaveTextContent("Hotel de Luxe Paris");

        // Vérifier que la location s'affiche
        expect(screen.getByTestId("hotel-location")).toBeInTheDocument();
        expect(screen.getByTestId("hotel-location")).toHaveTextContent("75001 Paris, France");

        // Vérifier que la description s'affiche
        expect(screen.getByTestId("hotel-description")).toBeInTheDocument();
        expect(screen.getByTestId("hotel-description")).toHaveTextContent("Un magnifique hôtel 5 étoiles en plein cœur de Paris");

        // Vérifier que le rating s'affiche
        expect(screen.getByTestId("hotel-rating")).toBeInTheDocument();
        expect(screen.getByTestId("hotel-rating")).toHaveTextContent("4.8");

        // Vérifier que le price s'affiche
        expect(screen.getByTestId("hotel-price")).toBeInTheDocument();
        expect(screen.getByTestId("hotel-price")).toHaveTextContent("250");
    });

    test("affiche le message de chargement quand les données sont en cours de récupération", () => {
        // Mock pour l'état "loading"
        mockUseGetHotelById.mockReturnValue({
            isPending: true,
            error: null,
            data: null,
        });

        render(
            <MemoryRouter initialEntries={["/hotels/1"]}>
                <Routes>
                    <Route path="/hotels/:id" element={<HotelDetails />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText("Chargement des favoris...")).toBeInTheDocument();
    });

    test("affiche le message d'erreur quand il y a une erreur", () => {
        // Mock pour l'état "error"
        mockUseGetHotelById.mockReturnValue({
            isPending: false,
            error: new Error("Erreur réseau"),
            data: null,
        });

        render(
            <MemoryRouter initialEntries={["/hotels/1"]}>
                <Routes>
                    <Route path="/hotels/:id" element={<HotelDetails />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText("Erreur lors du chargement des favoris")).toBeInTheDocument();
    });

    test("affiche le message 'Hôtel non trouvé' quand l'ID n'existe pas", () => {
        // Mock pour l'état "hotel not found"
        mockUseGetHotelById.mockReturnValue({
            isPending: false,
            error: null,
            data: null, // Pas de données = hôtel non trouvé
        });

        render(
            <MemoryRouter initialEntries={["/hotels/999"]}>
                <Routes>
                    <Route path="/hotels/:id" element={<HotelDetails />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText("Hôtel non trouvé")).toBeInTheDocument();
        expect(screen.getByText(/999/)).toBeInTheDocument();
    });
});
