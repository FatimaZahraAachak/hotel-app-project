import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import MyReservations from "./MyReservations";
import { AuthContext } from "../context/AuthContext";
import { useReservations } from "../queries/reservations";
import type { User } from "@supabase/supabase-js";
import type { Reservation } from "../types";

const mockUser = {
    id: "1",
} as User;
const mockRes1: Reservation = {
    id: 1,
    hotelId: 1,
    startDate: new Date(),
    endDate: new Date(),
    guestName: "fati",
    totalPrice: 120,
    hotel: {
        id: 1,
        name: "Hotel Test",
        location: "Paris",
        price: 120,
        rating: 4.5,
        image: "",
        description: "Desc",
        amenities: []
    },
    user_id: "1"
};

const mockRes2: Reservation = {
    id: 2,
    hotelId: 2,
    startDate: new Date(),
    endDate: new Date(),
    guestName: "zahra",
    totalPrice: 140,
    hotel: {
        id: 2,
        name: "Hotel Test 2",
        location: "Paris2",
        price: 120,
        rating: 4.5,
        image: "",
        description: "Desc",
        amenities: []
    },
    user_id: "2"
};

vi.mock("../queries/reservations")
vi.mock("../components/ReservationCard", () => ({
    default: () => <div>MOCK_RESERVATION_CARD</div>
}));

describe("MyReservations", () => {
    test("SCÉNARIO 1 — Chargement ", () => {
        vi.mocked(useReservations).mockReturnValue({
            isPending: true,
            error: null,
            data: undefined
        })
        render(

            <AuthContext.Provider value={{ user: mockUser, loading: false, logout: vi.fn() }}>
                <MyReservations />
            </AuthContext.Provider >
        );
        expect(screen.getByText("Chargement des reservations...")).toBeInTheDocument();

    });
    test("SCÉNARIO 2 — Erreur ", () => {
        vi.mocked(useReservations).mockReturnValue({
            isPending: false,
            error: new Error("Erreur test"),
            data: undefined
        })
        render(
            <AuthContext.Provider value={{ user: mockUser, loading: false, logout: vi.fn() }}>
                <MyReservations />
            </AuthContext.Provider >
        );
        expect(screen.getByText("Erreur lors du chargement des reservations")).toBeInTheDocument();

    });
    test("SCÉNARIO 3 — Aucune réservation", () => {
        vi.mocked(useReservations).mockReturnValue({
            isPending: false,
            error: null,
            data: []
        })
        render(

            <AuthContext.Provider value={{ user: mockUser, loading: false, logout: vi.fn() }}>
                <MyReservations />
            </AuthContext.Provider >

        );
        expect(screen.getByText("Your Reservations")).toBeInTheDocument();
        expect(screen.getByText("Vous n’avez pas encore de réservation.")).toBeInTheDocument();
        expect(screen.getByText("Aucune donnée disponible pour le moment.")).toBeInTheDocument();
        expect(screen.queryByText("MOCK_RESERVATION_CARD")).not.toBeInTheDocument();


    });
    test("SCÉNARIO 4 — Réservations présentes", () => {
        vi.mocked(useReservations).mockReturnValue({
            isPending: false,
            error: null,
            data: [mockRes1, mockRes2]
        })
        render(

            <AuthContext.Provider value={{ user: mockUser, loading: false, logout: vi.fn() }}>
                <MyReservations />
            </AuthContext.Provider >

        );
        expect(screen.getByText("Your Reservations")).toBeInTheDocument();
        expect(screen.getByText("2 réservation(s) enregistrée(s)")).toBeInTheDocument();
        expect(screen.getAllByText("MOCK_RESERVATION_CARD")).toHaveLength(2);



    });

})