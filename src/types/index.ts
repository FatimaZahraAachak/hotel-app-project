export interface Hotel {
    id: string;
    name: string;
    location: string;
    price: number;
    rating: number;
    image: string;
    description: string;
    amenities: string[];
}
export interface Reservation {
    id: string;
    hotelId: string;
    startDate: string; // Format ISO YYYY-MM-DD
    endDate: string;
    guestName: string;
    totalPrice: number;
    status: "confirmed" | "cancelled";
}
