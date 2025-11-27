import { Link } from "react-router"

function NavBar() {
    return <nav>
        <div>
            <Link to="/"> Hotel App </Link>
        </div>
        <div>
            <Link to="/">Home</Link>
            <Link to="/hotel-details" >Hotel Details</Link>
            <Link to="/my-reservations">My Reservations</Link>
        </div>
    </nav>
}
export default NavBar