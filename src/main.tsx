import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-responsive-modal/styles.css';
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { HotelProvider } from './context/HotelProvider.tsx';
import { SearchProvider } from './context/SearchProvider.tsx';
import { FavoriteProvider } from './context/FavoriteProvider.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <HotelProvider>
        <SearchProvider>
            <FavoriteProvider>
              <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
            </FavoriteProvider>
        </SearchProvider>
      </HotelProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
