import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-responsive-modal/styles.css';
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { HotelProvider } from './context/HotelProvider.tsx';
import { SearchProvider } from './context/SearchProvider.tsx';
import { BookingProvider } from './context/BookingProvider.tsx';
import { FavoriteProvider } from './context/FavoriteProvider.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <HotelProvider>
        <SearchProvider>
          <BookingProvider>
            <FavoriteProvider>
                <App />
            </FavoriteProvider>
          </BookingProvider>
        </SearchProvider>
      </HotelProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
