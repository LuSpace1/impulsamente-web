import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"; // Importa bootstrap  nivel global
import {BrowserRouter} from 'react-router-dom' // Importaciones de react-router
import { AdminAuthProvider } from "./context/AdminAuthContext.jsx";

createRoot(document.getElementById("root")).render(
  //Strictmode: Ejecuta el codigo 2 veces. Verifica q el codigo este "limpio"
  <StrictMode> 
    <BrowserRouter>
      <AdminAuthProvider>
        <App />
      </AdminAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
