import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import HotelDetails from './pages/HotelDetails/HotelDetails'
import MyReservations from './pages/MyReservations'
import NavBar from './components/NavBar'
import Favorites from './pages/Favorites'
import Login from './pages/Login'
import { ProtectedRoute } from './components/ProtectedRoute'
import { SignUp } from './pages/SignUp'
import { BookingProvider } from './context/BookingProvider'



function App() {

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <NavBar />

      <main className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/favorites" element={<ProtectedRoute> <Favorites /></ProtectedRoute>} />
          <Route path="/my-reservations" element={<ProtectedRoute>
            <BookingProvider>
              <MyReservations />
            </BookingProvider>
          </ProtectedRoute>} />
          <Route path="/hotels/:id" element={<BookingProvider><HotelDetails /> </BookingProvider>} />

        </Routes>
      </main>
    </div>
  );
}

export default App;

