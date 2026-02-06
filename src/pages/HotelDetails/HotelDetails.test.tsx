import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import HotelDetails from "./HotelDetails";
import { BrowserRouter } from "react-router-dom";

vi.mock("../../queries/hotels", () => ({
    useGetHotelById: () => ({
        isPending: false,
        error: null,
        data: {
            id: 1,
            name: "Hotel Test",
            location: "Paris",
            price: 120,
            rating: 4.5,
            image: "",
            description: "Desc",
            amenities: [],
        },
    }),
}));

describe("HotelDetails", () => {
    test("affiche les sections principales", () => {
        render(
            <BrowserRouter>
                <HotelDetails />
            </BrowserRouter>
        );

        expect(screen.getByText("Hotel Test")).toBeInTheDocument();
        expect(screen.getByText("Paris")).toBeInTheDocument();
    });
});
