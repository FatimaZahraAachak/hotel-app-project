import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { FavoritesButtonNotUser } from "./FavoritesButtonNotUser";
import { BrowserRouter } from "react-router-dom";

// mock du navigate
const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
    useNavigate: () => mockNavigate,
}));

describe("FavoritesButtonNotUser", () => {
    test("affiche le bouton ajouter aux favoris", () => {
        render(
            <BrowserRouter>
                <FavoritesButtonNotUser />
            </BrowserRouter>
        );

        expect(
            screen.getByRole("button", { name: /ajouter aux favoris/i })
        ).toBeInTheDocument();
    });

    test("redirige vers /login au clic", () => {
        render(
            <BrowserRouter>
                <FavoritesButtonNotUser />
            </BrowserRouter>
        );

        fireEvent.click(
            screen.getByRole("button", { name: /ajouter aux favoris/i })
        );

        expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
});
