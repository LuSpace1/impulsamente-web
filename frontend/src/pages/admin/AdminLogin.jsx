import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAdminAuth } from "../../context/AdminAuthContext.jsx";
import "./AdminStyles.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { status, mustChangePassword, login } = useAdminAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (status === "authenticated" && mustChangePassword) {
    return <Navigate to="/admin/password" replace />;
  }

  if (status === "authenticated" && !mustChangePassword) {
    return <Navigate to="/admin/profesionales" replace />;
  }

  if (status === "loading") {
    return (
      <section className="admin-auth-layout">
        <div className="page-loader">Verificando sesión…</div>
      </section>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const data = await login(form);
      if (data.must_change_password) {
        navigate("/admin/password");
      } else {
        navigate("/admin/profesionales");
      }
    } catch (err) {
      const message = err.response?.data?.detail || err.response?.data?.non_field_errors?.[0];
      setError(message || "No se pudo iniciar sesión. Verifique sus datos.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="admin-auth-layout">
      <div className="admin-auth-card">
        <h1>Panel Administrativo</h1>
        <p className="admin-auth-subtitle">Acceso exclusivo para el equipo de ImpulsaMente.</p>
        {error && <div className="admin-auth-alert">{error}</div>}
        <form className="admin-auth-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="admin-auth-button" disabled={isSubmitting}>
            {isSubmitting ? "Ingresando…" : "Ingresar"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;
