import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";
import { AuthContext, type AuthContextValue } from "../context/AuthContext";
import userEvent from "@testing-library/user-event";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../services/supabase";

/**
 * TESTS D'INTÉGRATION pour Login
 *
 * Différence avec le test unitaire :
 * - ✅ On teste le vrai formulaire et ses validations réelles
 * - ✅ On teste avec le vrai AuthContext
 * - ❌ Supabase est toujours mocké (via setup.ts)
 * - ❌ Navigation est testée avec MemoryRouter (pas mockée)
 */

const mockSignIn = vi.mocked(supabase.auth.signInWithPassword);

const mockUser: User = {
    id: "1",
    app_metadata: {},
    user_metadata: {},
    aud: "authenticated",
    created_at: "",
};

describe("Login - INTÉGRATION", () => {
    test("affiche le formulaire de connexion avec tous les éléments", () => {
        const mockAuthValue: AuthContextValue = {
            user: null,
            loading: false,
            logout: vi.fn(),
        };

        render(
            <MemoryRouter>
                <AuthContext.Provider value={mockAuthValue}>
                    <Login />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText("Connexion")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Adresse e-mail")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Mot de passe")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /se connecter/i })).toBeInTheDocument();
    });

    test("le bouton est désactivé si les champs sont vides", () => {
        const mockAuthValue: AuthContextValue = {
            user: null,
            loading: false,
            logout: vi.fn(),
        };

        render(
            <MemoryRouter>
                <AuthContext.Provider value={mockAuthValue}>
                    <Login />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const button = screen.getByRole("button", { name: /se connecter/i });
        expect(button).toBeDisabled();
    });

    test("le bouton est activé si les deux champs sont remplis", async () => {
        const mockAuthValue: AuthContextValue = {
            user: null,
            loading: false,
            logout: vi.fn(),
        };

        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <AuthContext.Provider value={mockAuthValue}>
                    <Login />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const emailInput = screen.getByPlaceholderText("Adresse e-mail");
        const passwordInput = screen.getByPlaceholderText("Mot de passe");
        const button = screen.getByRole("button", { name: /se connecter/i });

        await user.type(emailInput, "test@example.com");
        await user.type(passwordInput, "password123");

        expect(button).not.toBeDisabled();
    });

    test("appelle Supabase avec les bons arguments si l'email est valide", async () => {
        const mockAuthValue: AuthContextValue = {
            user: null,
            loading: false,
            logout: vi.fn(),
        };

        mockSignIn.mockResolvedValueOnce({
            data: { user: mockUser, session: null as any },
            error: null,
        });

        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <AuthContext.Provider value={mockAuthValue}>
                    <Login />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const emailInput = screen.getByPlaceholderText("Adresse e-mail");
        const passwordInput = screen.getByPlaceholderText("Mot de passe");
        const button = screen.getByRole("button", { name: /se connecter/i });

        await user.type(emailInput, "valid@example.com");
        await user.type(passwordInput, "password123");
        await user.click(button);

        expect(mockSignIn).toHaveBeenCalledWith({
            email: "valid@example.com",
            password: "password123",
        });
    });

    test("affiche le texte 'Chargement...' si l'utilisateur est en cours de chargement", () => {
        const mockAuthValue: AuthContextValue = {
            user: null,
            loading: true,
            logout: vi.fn(),
        };

        render(
            <MemoryRouter>
                <AuthContext.Provider value={mockAuthValue}>
                    <Login />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText("Chargement...")).toBeInTheDocument();
    });

    test("redirige si l'utilisateur est déjà connecté", () => {
        const mockAuthValue: AuthContextValue = {
            user: mockUser,
            loading: false,
            logout: vi.fn(),
        };

        render(
            <MemoryRouter initialEntries={["/login"]}>
                <AuthContext.Provider value={mockAuthValue}>
                    <Login />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        // Le formulaire ne doit pas s'afficher si l'utilisateur est connecté
        expect(screen.queryByText("Connexion")).not.toBeInTheDocument();
    });
});
