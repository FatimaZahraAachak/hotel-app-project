import { Link } from "react-router";
import type { Hotel } from "../../types";

type HeaderProps = {
    found: Hotel
}

function Header({ found }: HeaderProps) {
    return (
        <div>
            <div className="mb-5 md:mb-6 flex items-center gap-2 text-sm">
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition">
                    Accueil
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 font-medium">{found.name}</span>
            </div>
            <div className="overflow-hidden rounded-2xl bg-white shadow-md">
                <img
                    src={found.image}
                    alt={`${found.name} — ${found.location}`}
                    className="h-[260px] w-full object-cover md:h-[360px] lg:h-[460px]"
                    loading="eager"
                />
            </div>
        </div>
    )
}
export default Header;