import "./App.css";
import { Route, Routes } from "react-router-dom";

// Componentes y pages
import AgendarIntegral from "./pages/AgendarIntegral/AgendarIntegral";
import AgendarMetodologo from "./pages/AgendarMetodologo/AgendarMetodologo";
import AgendarPsicologo from "./pages/AgendarPsicologo/AgendarPsicologo";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header";
import ChangePassword from "./pages/admin/ChangePassword";
// Admin Impulsamente
import EditProfessional from "./pages/admin/EditProfessional";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateProfessional from "./pages/admin/CreateProfessional";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cotizar-psicologico" element={<AgendarPsicologo />} />
        <Route path="/cotizar-metodologia" element={<AgendarMetodologo />} />
        <Route path="/cotizar-integral" element={<AgendarIntegral />} />
        <Route path="/admin-panel/dashboard" element={<AdminDashboard />} />
        <Route
          path="/admin-panel/profesionales/nuevo"
          element={<CreateProfessional />}
        />

        <Route
          path="/admin-panel/profesionales/:id/editar"
          element={<EditProfessional />}
        />

        <Route
          path="/admin-panel/cambiar-password"
          element={<ChangePassword />}
        />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;