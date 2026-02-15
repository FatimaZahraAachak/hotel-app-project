import { fireEvent, render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { AuthContext } from "../context/AuthContext";
import type { User } from "@supabase/supabase-js";
import Login from "./Login";
import { supabase } from "../services/supabase";
import userEvent from "@testing-library/user-event";
import { AuthError } from "@supabase/supabase-js";
import { MemoryRouter } from "react-router-dom";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
    vi.clearAllMocks();
    cleanup();
});

vi.mock("../services/supabase", () => ({
    supabase: {
        auth: {
            signInWithPassword: vi.fn(),
        },
    },
}));
const mockSignIn = vi.mocked(supabase.auth.signInWithPassword);

const mockUser: User = {
    id: "1",
    app_metadata: {},
    user_metadata: {},
    aud: "authenticated",
    created_at: "",
};


const fakeAuthError = new AuthError(
    "Invalid login",
    400,
    "invalid_credentials"
);


describe("Login", () => {
    test("SCÉNARIO 1-Chargement", () => {
        render(
            <MemoryRouter>
                <AuthContext.Provider value={{ user: null, loading: true, logout: vi.fn() }}>
                    <Login />
                </AuthContext.Provider >
            </MemoryRouter>
        );
        expect(screen.getByText("Chargement...")).toBeInTheDocument();
    });
    test("SCÉNARIO 2 — redirige si utilisateur déjà connecté", () => {

        render(
            <MemoryRouter>
                <AuthContext.Provider value={{ user: mockUser, loading: false, logout: vi.fn() }}>
                    <Login />
                </AuthContext.Provider >
            </MemoryRouter>
        );
        expect(screen.queryByText("Connexion")).not.toBeInTheDocument();



    });
    test("SCÉNARIO 3 — Formulaire affiché normalement", () => {
        render(

            <MemoryRouter>
                <AuthContext.Provider value={{ user: null, loading: false, logout: vi.fn() }}>
                    <Login />
                </AuthContext.Provider >
            </MemoryRouter>
        );
        expect(screen.getByText("Connexion")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Adresse e-mail")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Mot de passe")).toBeInTheDocument();
    });
    test("SCÉNARIO 4 — Email invalide", async () => {
       
        render(
            <MemoryRouter>
                <AuthContext.Provider value={{ user: null, loading: false, logout: vi.fn() }}>
                    <Login />
                </AuthContext.Provider >
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


        expect(mockSignIn).not.toHaveBeenCalled();

    });
    test("SCÉNARIO 5 —CONTEXTE MANQUANT", () => {
        render(
            <MemoryRouter>
                    <Login /> 
            </MemoryRouter>
        );
        expect(
            screen.getByText(/AuthProvider manquant/i)
        ).toBeInTheDocument();

    });
    test("SCÉNARIO 6 — Supabase retourne une erreur", async () => {
        mockSignIn.mockResolvedValue({
            data: { user: null, session: null },
            error: fakeAuthError,
        });

        render(
            <MemoryRouter>
                <AuthContext.Provider value={{ user: null, loading: false, logout: vi.fn() }}>
                    <Login />
                </AuthContext.Provider >
            </MemoryRouter>
        );

        await userEvent.type(screen.getByPlaceholderText("Adresse e-mail"), "test@mail.com");
        await userEvent.type(screen.getByPlaceholderText("Mot de passe"), "123456");
        await userEvent.click(screen.getByRole("button", { name: /se connecter/i }));

        expect(mockSignIn).toHaveBeenCalled();


    });
    test("SCÉNARIO 7 — Erreur serveur", async () => {
        mockSignIn.mockRejectedValue(new Error("Server crash"));
        render(
            <MemoryRouter>
                <AuthContext.Provider value={{ user: null, loading: false, logout: vi.fn() }}>
                    <Login />
                </AuthContext.Provider >
            </MemoryRouter>
        );
        await userEvent.type(screen.getByPlaceholderText("Adresse e-mail"), "test@mail.com");
        await userEvent.type(screen.getByPlaceholderText("Mot de passe"), "123456");
        await userEvent.click(screen.getByRole("button", { name: /se connecter/i }));

        expect(
            screen.getByText("Erreur serveur. Réessayez plus tard.")
        ).toBeInTheDocument();

    });
})
