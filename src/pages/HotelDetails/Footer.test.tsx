import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import Footer from "./Footer";
import type { Hotel } from "../../types";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

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

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
    useNavigate: () => mockNavigate,
}));

describe("Footer", () => {
    test("affiche le prix par nuit", () => {
        render(
            <AuthContext.Provider value={{ user: null, loading: false, logout: vi.fn() }}>
                <BrowserRouter>
                    <Footer hotel={mockHotel} />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText("120€")).toBeInTheDocument();
        expect(screen.getByText("/ nuit")).toBeInTheDocument();
    });

    test("redirige vers login si utilisateur non connecté", () => {
        render(
            <AuthContext.Provider value={{ user: null, loading: false, logout: vi.fn() }}>
                <BrowserRouter>
                    <Footer hotel={mockHotel} />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        fireEvent.click(
            screen.getByRole("button", { name: /réserver maintenant/i })
        );

        expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
});
