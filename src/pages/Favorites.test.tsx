import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { AuthContext } from "../context/AuthContext";
import type { User } from "@supabase/supabase-js";
import { useFavorites } from "../queries/favorites";
import Favorites from "./Favorites";

const mockUser = {
    id: "1",
} as User;
const mockFav1 = {
    hotelId: 1,
    hotel: {
        id: 1,
        name: "Hotel Test",
        location: "Paris",
        price: 120,
        rating: 4.5,
        image: "",
        description: "Desc",
        amenities: []
    }
};

const mockFav2 = {
    hotelId: 2,
    hotel: {
        id: 2,
        name: "Hotel Test 2",
        location: "Paris2",
        price: 120,
        rating: 4.5,
        image: "",
        description: "Desc",
        amenities: []
    }
};

vi.mock("../queries/favorites")
vi.mock("../components/HotelCard/HotelCard", () => ({
    default: () => <div>MOCK_HOTEL_CARD</div>
}));

describe("Favorites", () => {
    test("SCÉNARIO 1 — Chargement ", () => {
        vi.mocked(useFavorites).mockReturnValue({
            isPending: true,
            error: null,
            data: undefined
        })
        render(

            <AuthContext.Provider value={{ user: mockUser, loading: false, logout: vi.fn() }}>
                <Favorites />
            </AuthContext.Provider >
        );
        expect(screen.getByText("Chargement des favoris...")).toBeInTheDocument();

    });
    test("SCÉNARIO 2 — Erreur ", () => {
        vi.mocked(useFavorites).mockReturnValue({
            isPending: false,
            error: new Error("Erreur test"),
            data: undefined
        })
        render(
            <AuthContext.Provider value={{ user: mockUser, loading: false, logout: vi.fn() }}>
                <Favorites />
            </AuthContext.Provider >
        );
        expect(screen.getByText("Erreur lors du chargement des favoris")).toBeInTheDocument();

    });
    test("SCÉNARIO 3 — Data vide", () => {
        vi.mocked(useFavorites).mockReturnValue({
            isPending: false,
            error: null,
            data: []
        })
        render(

            <AuthContext.Provider value={{ user: mockUser, loading: false, logout: vi.fn() }}>
                <Favorites />
            </AuthContext.Provider >

        );
        expect(screen.getByText("Hôtels Favoris")).toBeInTheDocument();
        expect(screen.getByText("Aucune donnée disponible pour le moment.")).toBeInTheDocument();
        expect(screen.queryByText("MOCK_HOTEL_CARD")).not.toBeInTheDocument();


    });
    test("SCÉNARIO 4 — Data présentes", () => {
        vi.mocked(useFavorites).mockReturnValue({
            isPending: false,
            error: null,
            data: [mockFav1, mockFav2]
        })
        render(

            <AuthContext.Provider value={{ user: mockUser, loading: false, logout: vi.fn() }}>
                <Favorites />
            </AuthContext.Provider >

        );
        expect(screen.getByText("Hôtels Favoris")).toBeInTheDocument();
        expect(screen.getAllByText("MOCK_HOTEL_CARD")).toHaveLength(2);
    });

    test("CONTEXTE MANQUANT", () => {

        render(
            <Favorites />
        );
        expect(screen.getByText("Erreur : AuthProvider manquant ⚠️")).toBeInTheDocument();
    });

})