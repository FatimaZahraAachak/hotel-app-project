import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


function NavBar() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    if (!authContext) {
        return <p> Erreur: AuthProvider manquant⚠️ </p>
    }
    const { user, logout } = authContext;
    const handleClick = () => {
        if (user) {
            logout();
        }

        navigate("/login");


    }
    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md ">
            <div className="mx-auto  max-w-7xl  px-4 py-3 md:px-6 md:py-4 lg:px-8">
                <div className="flex  items-center justify-between  ">
                    <Link
                        to="/"
                        className=" shrink-0 text-2xl font-bold text-gray-900 hover:text-gray-700 transition "
                    >
                        Hotel<span className="text-blue-500">App</span>
                    </Link>

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `text-sm font-medium transition ${isActive
                                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                                : "text-gray-600 hover:text-blue-600"
                            }`
                        }
                    >
                        Home
                    </NavLink>

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

                    <div className="flex  items-center gap-4 md:gap-6 px-2">
                        <button type='button' className='w-full   rounded-xl  px-4 py-2.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 ' onClick={handleClick}>{user ? 'Se déconnecter' : 'Se connecter'}</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
