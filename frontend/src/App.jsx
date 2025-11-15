import "./App.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import TestApi from "./components/TestApi.jsx";
import { useAdminAuth } from "./context/AdminAuthContext.jsx";
import AgendarIntegral from "./pages/AgendarIntegral.jsx";
import AgendarMetodologo from "./pages/AgendarMetodologo.jsx";
import AgendarPsicologo from "./pages/AgendarPsicologo.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import Home from "./pages/Home.jsx";
import PlansOverview from "./pages/PlansOverview.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminPasswordChange from "./pages/admin/AdminPasswordChange.jsx";
import ProfessionalsDashboard from "./pages/admin/ProfessionalsDashboard.jsx";

const LoadingScreen = () => (
  <div className="page-loader">
    <div className="page-loader__spinner" aria-hidden />
    <p>Cargando…</p>
  </div>
);

const RequireAdmin = ({ children }) => {
  const { status, mustChangePassword } = useAdminAuth();

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (status !== "authenticated") {
    return <Navigate to="/admin/login" replace />;
  }

  if (mustChangePassword) {
    return <Navigate to="/admin/password" replace />;
  }

  return children;
};

const RequirePasswordUpdate = ({ children }) => {
  const { status, mustChangePassword } = useAdminAuth();

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (status !== "authenticated") {
    return <Navigate to="/admin/login" replace />;
  }

  if (!mustChangePassword) {
    return <Navigate to="/admin/profesionales" replace />;
  }

  return children;
};

function App() {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideLayout && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planes" element={<PlansOverview />} />
        <Route path="/planes/integral" element={<AgendarIntegral />} />
        <Route path="/planes/metodologia" element={<AgendarMetodologo />} />
        <Route path="/planes/psicologia" element={<AgendarPsicologo />} />
        <Route path="/agendar/:service/:professionalId" element={<BookingPage />} />
        <Route path="/testapi" element={<TestApi />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/password"
          element={
            <RequirePasswordUpdate>
              <AdminPasswordChange />
            </RequirePasswordUpdate>
          }
        />
        <Route
          path="/admin/profesionales"
          element={
            <RequireAdmin>
              <ProfessionalsDashboard />
            </RequireAdmin>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
