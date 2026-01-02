import { Link, NavLink } from "react-router-dom";


function NavBar() {
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

                    <div className="flex  items-center gap-6">
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
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
