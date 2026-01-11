import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UserMenu } from "./UserMenu";
import { NotUserMenu } from "./NotUserMenu";


function NavBar() {
    const authContext = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    if (!authContext) {
        return <p> Erreur: AuthProvider manquant⚠️ </p>
    }
    const { user } = authContext;
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
                        Hotels
                    </NavLink>
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden text-2xl"
                    >
                        ☰
                    </button>
                    <div
                        className={`
    ${open ? "block" : "hidden"}
    absolute top-full left-0 w-full
    bg-white shadow-md
    md:static md:block md:w-auto md:shadow-none
  `}
                    >
                        {user ? <UserMenu /> : <NotUserMenu />}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
