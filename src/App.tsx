import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import HotelDetails from './pages/HotelDetails'
import MyReservations from './pages/MyReservations'
import NavBar from './components/NavBar'

function App() {


  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotel-details:id" element={<HotelDetails />} />
          <Route path="/my-reservations" element={<MyReservations />} />
        </Routes>
      </main>
    </>
  )
}

export default App
