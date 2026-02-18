import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import type { Mock } from "vitest";
import { FavoritesButton } from "./FavoritesButton";
import type { Hotel } from "../../types";

vi.mock("../../queries/favorites", () => ({
    useFavorites: vi.fn(),
    useAddFavorites: vi.fn(),
    useRemoveFavorites: vi.fn(),
}));

import {
    useFavorites,
    useAddFavorites,
    useRemoveFavorites,
} from "../../queries/favorites";

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

describe("FavoritesButton", () => {
    const mockMutate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("affiche le bouton", () => {
        (useFavorites as Mock).mockReturnValue({ data: [] });
        (useAddFavorites as Mock).mockReturnValue({ mutate: mockMutate });
        (useRemoveFavorites as Mock).mockReturnValue({ mutate: mockMutate });

        render(<FavoritesButton hotel={mockHotel} userId="123" />);

        expect(screen.getByRole("button")).toBeInTheDocument();
    });
});

