import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export function UserMenu() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    if (!authContext) {
        return <p> Erreur: AuthProvider manquant⚠️ </p>
    }
    const { logout } = authContext;
    const handleClick = () => {
          logout();
        navigate("/login");
    }
    return (
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 ">
            <NavLink
                to="/favorites"
                className={({ isActive }) =>
                    `text-sm font-medium transition ${isActive
                        ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                        : "text-gray-600 hover:text-blue-600"
                    }`
                }
            >
                Favorites
            </NavLink>

            <NavLink
                to="/my-reservations"
                className={({ isActive }) =>
                    `text-sm font-medium transition ${isActive
                        ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                        : "text-gray-600 hover:text-blue-600"
                    }`
                }
            >
                My Reservations
            </NavLink>


            <button type='button' className='rounded-xl  px-2 py-2 md:ml-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 ' onClick={handleClick}>Se déconnecter</button>

        </div>
    )
}