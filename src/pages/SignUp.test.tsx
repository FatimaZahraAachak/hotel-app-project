import { fireEvent, render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";

import { MemoryRouter } from "react-router-dom";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { SignUp } from "./SignUp";
import { supabase } from "../services/supabase";
import { AuthError } from "@supabase/supabase-js";

afterEach(() => {
    vi.clearAllMocks();
    cleanup();
});

vi.mock("../services/supabase", () => ({
    supabase: {
        auth: {
            signUp: vi.fn(),
        },
    },
}));

const mocksignUp = vi.mocked(supabase.auth.signUp);

vi.mock("./SignUpConfirmation", () => ({
    default: () => <div>MOCK_SIGNUP_CONFIRMATION</div>
}));
const fakeAuthError = new AuthError(
    "User already exists",
    400,
    "user_already_exists"
);

describe("SignUp", () => {
    test("SCÉNARIO 1-Formulaire affiché", () => {
        render(
            <MemoryRouter>
                    <SignUp />
            </MemoryRouter>
        );
        expect(screen.getByText("Créer un compte")).toBeInTheDocument();
        expect(screen.getByText("Rejoingner HotelApp en quelques secondes")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Adresse e-mail")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Mot de passe")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /créer mon compte/i })).toBeInTheDocument();
        const loginLink = screen.getByRole("link", { name: /se connecter/i });
        expect(loginLink).toBeInTheDocument();
        expect(loginLink).toHaveAttribute("href", "/login");

    });

    test("SCÉNARIO 2 — Succès → affiche SignUpConfirmation", () => {
        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );
        expect(screen.queryByText("MOCK_SIGNUP_CONFIRMATION")).not.toBeInTheDocument();

    });

    test("SCÉNARIO 3 — Password invalide", async() => {
        render(

            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByPlaceholderText("Adresse e-mail"), {
            target: { value: "fatiaachal@gmail.com" }
        });

        fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
            target: { value: "invalide" }
        });

        fireEvent.submit(screen.getByRole("button").closest("form")!);

        expect(
            await screen.findByText(/majuscule/i)
        ).toBeInTheDocument();


        expect(mocksignUp).not.toHaveBeenCalled();
    });

    test("SCÉNARIO 4 — Email invalide", async () => {
       
        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByPlaceholderText("Adresse e-mail"), {
            target: { value: "invalid" }
        });

        fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
            target: { value: "123456" }
        });

        fireEvent.submit(screen.getByRole("button").closest("form")!);

        expect(
            await screen.findByText(/invalide/i)
        ).toBeInTheDocument();


        expect(mocksignUp).not.toHaveBeenCalled();

    });
   
    test("SCÉNARIO 5 — Supabase retourne une erreur", async () => {
        mocksignUp.mockResolvedValue({
            data: { user: null, session: null },
            error: fakeAuthError,
        });

        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Adresse e-mail"), {
            target: { value: "test@mail.com" }
        });

        fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
            target: { value: "Password123!" }
        });

        fireEvent.submit(screen.getByRole("button").closest("form")!);

        expect(
            await screen.findByText(/existe déjà/i)
        ).toBeInTheDocument();

        expect(mocksignUp).toHaveBeenCalled();

    });
    test("SCÉNARIO 6 — Erreur serveur", async () => {
        mocksignUp.mockRejectedValue(new Error("Server crash"));
        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByPlaceholderText("Adresse e-mail"), {
            target: { value: "test@mail.com" }
        });

        fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
            target: { value: "Password123!" }
        });

        fireEvent.submit(screen.getByRole("button").closest("form")!);

        expect(
            await screen.findByText(/erreur serveur/i)
        ).toBeInTheDocument();

    });
})
