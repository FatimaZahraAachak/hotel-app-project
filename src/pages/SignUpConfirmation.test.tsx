import { render,screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { SignUpConfirmation } from "./SignUpConfirmation";

describe("SignUpConfirmation", () => {
    test("tester la confirmation", () => {
        render(
            <MemoryRouter>
                <SignUpConfirmation />
            </MemoryRouter>
        );
        expect(screen.getByText("Inscription réussie !")).toBeInTheDocument();
        const loginLink = screen.getByRole("link", { name: /se connecter/i });
        expect(loginLink).toBeInTheDocument();
        expect(loginLink).toHaveAttribute("href", "/login");
        
    })
})