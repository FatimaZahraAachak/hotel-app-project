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
    startDate: Date | null;
    endDate: Date | null;
    guestName: string;
    totalPrice: number;
    hotel: Hotel,
    user_id:string
}
export interface Favorite {
    id: number,
    hotelId: number,
    hotel: Hotel,
    user_id: string
}
export interface NewReservation {
    hotelId: number;
    startDate: string;
    endDate: string;
    guestName: string;
    totalPrice: number;
}