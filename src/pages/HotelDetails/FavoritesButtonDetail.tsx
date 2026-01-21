import { useAddFavorites, useFavorites, useRemoveFavorites } from "../../queries/favorites";
import type { Hotel } from "../../types";
type Props = {
    hotel: Hotel;
    userId: string
};
export function FavoritesButtondetail({ hotel, userId }: Props) {
    const addFavoriteMutation = useAddFavorites(userId);
    const removeFavoriteMutation = useRemoveFavorites(userId);
    const { data } = useFavorites(userId);
    const favoriteIds = data ? data.map(f => f.hotelId) : [];
    const favorite = favoriteIds.includes(hotel.id)

    const onFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (favorite) removeFavoriteMutation.mutate({ hotelId: hotel.id });
        else addFavoriteMutation.mutate({ hotelId: hotel.id })

    }
    return (
        <button
            className={`mt-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50 transition ${favorite ? "text-red-500" : "text-gray-400 hover:text-red-400"}`}

            type="button" onClick={onFavoriteClick}
        >
            ♥ {favorite ? ("supprimer de favoris") : ("Ajouter aux favoris")}
        </button>
    )
}