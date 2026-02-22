import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* Agregamos el Toaster para que los mensajes de éxito/error funcionen en toda la app */}
    <Toaster position="bottom-right" richColors />
  </StrictMode>,
);