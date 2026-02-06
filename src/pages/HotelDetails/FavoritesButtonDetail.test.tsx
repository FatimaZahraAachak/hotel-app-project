import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { FavoritesButtondetail } from "./FavoritesButtonDetail";
import type { Hotel } from "../../types";

const mockHotel: Hotel = {
    id: 1,
    name: "Hotel Test",
    location: "Paris",
    price: 120,
    rating: 4.5,
    image: "",
    description: "",
    amenities: [],
};

const addMutate = vi.fn();
const removeMutate = vi.fn();

vi.mock("../../queries/favorites", () => ({
    useFavorites: () => ({
        data: [],
    }),
    useAddFavorites: () => ({
        mutate: addMutate,
    }),
    useRemoveFavorites: () => ({
        mutate: removeMutate,
    }),
}));

describe("FavoritesButtondetail", () => {
    test("affiche le bouton ajouter aux favoris", () => {
        render(<FavoritesButtondetail hotel={mockHotel} userId="user-1" />);

        expect(
            screen.getByRole("button", { name: /ajouter aux favoris/i })
        ).toBeInTheDocument();
    });

    test("appelle addFavorite au clic", () => {
        render(<FavoritesButtondetail hotel={mockHotel} userId="user-1" />);

        fireEvent.click(
            screen.getByRole("button", { name: /ajouter aux favoris/i })
        );

        expect(addMutate).toHaveBeenCalledWith({ hotelId: 1 });
    });
});
