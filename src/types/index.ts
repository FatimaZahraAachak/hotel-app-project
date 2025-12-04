export interface Hotel {
    id: number;
    name: string;
    location: string;
    price: number;
    rating: number;
    image: string;
    description: string;
    amenities: string[];
}
export interface Reservation {
    id: number;
    hotelId: number;
    startDate: string; // Format ISO YYYY-MM-DD
    endDate: string;
    guestName: string;
    totalPrice: number;
}
