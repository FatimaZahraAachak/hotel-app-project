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
    test("affiche les informations principales", () => {
        render(<Informations hotel={mockHotel} />);

        expect(screen.getByTestId("hotel-name"))
            .toHaveTextContent("Hotel Test");

        expect(screen.getByTestId("hotel-location"))
            .toHaveTextContent("Paris");

        expect(screen.getByTestId("hotel-description"))
            .toHaveTextContent("Un hôtel de test pour les tests unitaires");
    });

    test("affiche la note correctement formatée", () => {
        render(<Informations hotel={mockHotel} />);

        expect(screen.getByTestId("hotel-rating"))
            .toHaveTextContent("4.5");
    });

    test("affiche le prix par nuit", () => {
        render(<Informations hotel={mockHotel} />);

        expect(screen.getByTestId("hotel-price"))
            .toHaveTextContent("120 € / nuit");
    });
});
