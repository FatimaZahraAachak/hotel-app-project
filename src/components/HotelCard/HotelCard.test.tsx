import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import HotelCard from "./HotelCard";
import { AuthContext } from "../../context/AuthContext";
import type { Hotel } from "../../types";
import type { User } from "@supabase/supabase-js";


vi.mock("./FavoritesButton", () => ({
    FavoritesButton: () => <div>Mocked Favorite</div>,
}));

const mockHotel: Hotel = {
    id: 1,
    name: "Hotel Test",
    location: "Paris",
    price: 120,
    rating: 4.5,
    image: "https://via.placeholder.com/300",
    description: "Un hôtel de test",
    amenities: ["WiFi", "Piscine", "Climatisation"],
};

const renderComponent = (user: User | null = null): void => {
    render(
        <AuthContext.Provider
            value={{
                user,
                loading: false,
                logout: vi.fn(),
            }}
        >
            <BrowserRouter>
                <HotelCard hotel={mockHotel} />
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

describe("HotelCard", () => {
    test("affiche les informations principales", () => {
        renderComponent();

        expect(screen.getByTestId("hotel-name"))
            .toHaveTextContent("Hotel Test");

        expect(screen.getByText("Paris"))
            .toBeInTheDocument();

        expect(screen.getByText("120 € / nuit"))
            .toBeInTheDocument();
    });

    test("affiche le bouton favoris si utilisateur connecté", () => {
        const mockUser = {
            id: "123",
            email: "test@test.com",
            app_metadata: {},
            user_metadata: {},
            aud: "authenticated",
            created_at: new Date().toISOString(),
        } as User; // 🔥 Cast propre et contrôlé

        renderComponent(mockUser);

        expect(screen.getByTestId("favorites-button"))
            .toBeInTheDocument();
    });

    test("n'affiche pas le bouton favoris si non connecté", () => {
        renderComponent(null);

        expect(screen.queryByTestId("favorites-button"))
            .not.toBeInTheDocument();
    });

    test("le bouton Voir plus mène vers la bonne page", () => {
        renderComponent();

        const link = screen.getByRole("link", { name: /voir plus/i });

        expect(link).toHaveAttribute("href", "/hotels/1");
    });
});
