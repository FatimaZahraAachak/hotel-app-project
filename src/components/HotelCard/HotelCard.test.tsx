import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import HotelCard from "./HotelCard";
import { AuthContext } from "../../context/AuthContext";
import type { Hotel } from "../../types";
const mockHotel: Hotel = {
    id: 1,
    name: "Hotel Test",
    location: "Paris",
    price: 120,
    rating: 4.5,
    image: "https://via.placeholder.com/300",
    description: "Un hôtel de test pour les tests unitaires",
    amenities: ["WiFi", "Piscine", "Climatisation"],
};

const mockAuthContext = {
    user: null,
    loading: false,
    logout: vi.fn(),
};
describe("HotelCard", () => {
    test("affiche le nom et la localisation de l’hôtel", () => {
        render(
            <AuthContext.Provider value={mockAuthContext}>
                <BrowserRouter>
                    <HotelCard hotel={mockHotel} />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText("Hotel Test")).toBeInTheDocument();
        expect(screen.getByText("Paris")).toBeInTheDocument();
    });
    test("affiche le prix par nuit", () => {
        render(
            <AuthContext.Provider value={mockAuthContext}>
                <BrowserRouter>
                    <HotelCard hotel={mockHotel} />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        screen.getByText(/120/);

    });
    test("affiche la note de l’hôtel", () => {
        render(
            <AuthContext.Provider value={mockAuthContext}>
                <BrowserRouter>
                    <HotelCard hotel={mockHotel} />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        expect(screen.getAllByText("4.5").length).toBeGreaterThan(0);
    });
    test("affiche le bouton Voir plus", () => {
        render(
            <AuthContext.Provider value={mockAuthContext}>
                <BrowserRouter>
                    <HotelCard hotel={mockHotel} />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        screen.getByText("Voir plus")

    });
    test("le bouton Voir plus mène vers la page de l’hôtel", () => {
        render(
            <AuthContext.Provider value={mockAuthContext}>
                <BrowserRouter>
                    <HotelCard hotel={mockHotel} />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        const link = screen.getByRole("link", { name: /voir plus/i });
        expect(link).toHaveAttribute("href", "/hotels/1");
    });
    test("n’affiche pas le bouton favoris si l’utilisateur n’est pas connecté", () => {
        render(
            <AuthContext.Provider value={mockAuthContext}>
                <BrowserRouter>
                    <HotelCard hotel={mockHotel} />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        expect(
            screen.queryByLabelText(/favori|favorite/i)
        ).not.toBeInTheDocument();
    });


});
