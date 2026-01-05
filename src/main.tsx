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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HotelProvider>
        <SearchProvider>
          <BookingProvider>
            <FavoriteProvider>
              <App />
            </FavoriteProvider>
          </BookingProvider>
        </SearchProvider>
      </HotelProvider>
    </BrowserRouter>
  </StrictMode>,
)
