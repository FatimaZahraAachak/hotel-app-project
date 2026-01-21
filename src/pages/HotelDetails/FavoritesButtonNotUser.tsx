import { useNavigate } from "react-router";

export function FavoritesButtonNotUser() {
    const navigate = useNavigate();
    const onFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate('/login')
    }
    return (
        <button
            className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium  hover:bg-gray-50 transition text-gray-400 hover:text-red-400"

            type="button" onClick={onFavoriteClick}
        >
            ♥ Ajouter aux favoris
        </button>
    )
}