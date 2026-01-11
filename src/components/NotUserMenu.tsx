import { useLocation, useNavigate } from "react-router-dom"

export function NotUserMenu() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/login");
    }
    const location = useLocation();
    if (location.pathname === '/login') {
        return null;
    }
    else {
        return (
            <div className="flex  items-center gap-4 md:gap-6 px-2">
                <button type='button' className='w-full   rounded-xl  px-4 py-2.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 ' onClick={handleClick}>Se connecter</button>
            </div>
        )
    }
}