import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import HotelDetails from './pages/HotelDetails'
import MyReservations from './pages/MyReservations'

function App() {


  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotel-details" element={<HotelDetails />} />
        <Route path="/my-reservations" element={<MyReservations />} />
      </Routes>
    </main>
  )
}

export default App
