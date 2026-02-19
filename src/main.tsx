import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-responsive-modal/styles.css';
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { SearchProvider } from './context/SearchProvider.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
              <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
