import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import HotelDetails from "./HotelDetails";
import { MemoryRouter, Routes, Route } from "react-router-dom";

/* Mock du hook */
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

/* Mock des composants enfants */
vi.mock("./Header", () => ({
    default: () => <div>MOCK_HEADER</div>,
}));

vi.mock("./Informations", () => ({
    default: () => <div>MOCK_INFORMATION</div>,
}));

vi.mock("./Equipments", () => ({
    default: () => <div>MOCK_EQUIPMENTS</div>,
}));

vi.mock("./Footer", () => ({
    default: () => <div>MOCK_FOOTER</div>,
}));

describe("HotelDetails", () => {
    test("affiche les sections principales", () => {
        render(
            <MemoryRouter initialEntries={["/hotels/1"]}>
                <Routes>
                    <Route path="/hotels/:id" element={<HotelDetails />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText("MOCK_HEADER")).toBeInTheDocument();
        expect(screen.getByText("MOCK_INFORMATION")).toBeInTheDocument();
        expect(screen.getByText("MOCK_EQUIPMENTS")).toBeInTheDocument();
        expect(screen.getByText("MOCK_FOOTER")).toBeInTheDocument();
    });
});
