
import { useAddFavorites, useFavorites, useRemoveFavorites } from "../../queries/favorites";
import type { Hotel } from "../../types";
type Props = {
    hotel: Hotel;
    userId: string
};

export function FavoritesButton({ hotel, userId }: Props) {

    const addFavoriteMutation = useAddFavorites(userId);
    const removeFavoriteMutation = useRemoveFavorites(userId);
    const { data } = useFavorites(userId);
    const isFavorite = data?.some((e) => e.hotelId === hotel.id)

    const onFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (isFavorite) removeFavoriteMutation.mutate({ hotelId: hotel.id });
        else addFavoriteMutation.mutate({ hotelId: hotel.id })

    }
    return (
        <div
            className="absolute right-3 top-3 inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-800 shadow-sm backdrop-blur"
        >
            <button
                type="button"
                data-testid="favorite-toggle"
                aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                onClick={onFavoriteClick}
                className={`text-base transition-colors duration-200
        ${isFavorite
                        ? "text-red-500"
                        : "text-gray-400 hover:text-red-400"
                    }`}
            >
                ♥
            </button>
        </div>
    );

}