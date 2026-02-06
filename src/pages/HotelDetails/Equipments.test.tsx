import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Equipments from "./Equipments";
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


describe("Equipments", () => {
    test("affiche le titre equipments", () => {
        render(
            < Equipments hotel={ mockHotel } />
        );
        expect(screen.getByText("Équipements")).toBeInTheDocument();
    });
    test("affiche tous les équipements du hotel", () => {
        render(<Equipments hotel={mockHotel} />);

        mockHotel.amenities.forEach((amenity) => {
            expect(screen.getByText(amenity)).toBeInTheDocument();
        });
    });

    test("affiche le bon nombre d’équipements", () => {
        render(<Equipments hotel={mockHotel} />);

        const items = screen.getAllByRole("listitem");
        expect(items).toHaveLength(mockHotel.amenities.length);
    });


});