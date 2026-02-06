import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import type { Hotel } from "../../types";
import Informations from "./Informations";

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


describe("Informations", () => {
    test("affiche le nom, la localisation et description de l'hotel", () => {
        render(
            < Informations hotel={mockHotel} />
        );
        expect(screen.getByText("Hotel Test")).toBeInTheDocument();
        expect(screen.getByText("Paris")).toBeInTheDocument();
        expect(screen.getByText("Un hôtel de test pour les tests unitaires")).toBeInTheDocument();
    });

    
    test("affiche la note de l'hotel", () => {
        render(
            < Informations hotel={mockHotel} />
        );
        expect(screen.getAllByText("4.5").length).toBeGreaterThan(0);
    });
    test("affiche le prix par nuit  ", () => {
        render(
            < Informations hotel={mockHotel} />
        );
        expect(screen.getByText("120 € / nuit")).toBeInTheDocument();
    });
});