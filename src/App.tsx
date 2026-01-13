import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import HotelDetails from './pages/HotelDetails/HotelDetails'
import MyReservations from './pages/MyReservations'
import NavBar from './components/NavBar'
import Favorites from './pages/Favorites'
import Login from './pages/Login'
import { ProtectedRoute } from './components/ProtectedRoute'
import { SingUp } from './pages/SingUp'


function App() {

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <NavBar />

      <main className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singUp" element={<SingUp />} />
          <Route path="/favorites" element={<ProtectedRoute> <Favorites /></ProtectedRoute>} />
          <Route path="/my-reservations" element={<ProtectedRoute>
            <MyReservations />
          </ProtectedRoute>} />

          <Route path="/hotels/:id" element={<HotelDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

