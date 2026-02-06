import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";
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

describe("Header", () => {

    test("affiche le bouton  Accueil", () => {
        render(
            <BrowserRouter>
                <Header hotel={mockHotel} />
            </BrowserRouter>
        );

        expect(
            screen.getByRole("link", { name: /Accueil/i })
        ).toBeInTheDocument();
    });
    test("le bouton Accueil mène vers la page d'accueil", () => {
        render(
            <BrowserRouter>
                <Header hotel={mockHotel} />
            </BrowserRouter>
        );

        const link = screen.getByRole("link", { name: /Accueil/i });
        expect(link).toHaveAttribute("href", "/");
    });
    test("affiche le nom  l’hôtel", () => {
        render(<BrowserRouter>
            <Header hotel={mockHotel} />
        </BrowserRouter>);

        expect(screen.getByText("Hotel Test")).toBeInTheDocument();
    });
    test("affiche l’image de l’hôtel avec un texte alternatif correct", () => {
        render(
            <BrowserRouter>
                <Header hotel={mockHotel} />
            </BrowserRouter>
        );

        const image = screen.getByAltText("Hotel Test — Paris");
        expect(image).toBeInTheDocument();
    });


})