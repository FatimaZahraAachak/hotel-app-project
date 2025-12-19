import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import HotelDetails from './pages/HotelDetails/HotelDetails'
import MyReservations from './pages/MyReservations'
import NavBar from './components/NavBar'
import Favorites from './pages/Favorites'


function App() {

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <NavBar />

      <main className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/my-reservations" element={<MyReservations />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

