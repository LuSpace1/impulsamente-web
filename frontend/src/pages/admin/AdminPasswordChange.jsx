import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAdminAuth } from "../../context/AdminAuthContext.jsx";
import { adminChangePassword } from "../../services/api.js";
import "./AdminStyles.css";

const AdminPasswordChange = () => {
  const navigate = useNavigate();
  const { status, mustChangePassword, setMustChangePassword } = useAdminAuth();
  const [form, setForm] = useState({ old_password: "", new_password: "", confirm_password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (status === "loading") {
    return (
      <section className="admin-auth-layout">
        <div className="page-loader">Cargando…</div>
      </section>
    );
  }

  if (status !== "authenticated") {
    return <Navigate to="/admin/login" replace />;
  }

  if (!mustChangePassword) {
    return <Navigate to="/admin/profesionales" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);
    try {
      await adminChangePassword(form);
      setSuccess("La contraseña se actualizó correctamente.");
      setMustChangePassword(false);
      navigate("/admin/profesionales", { replace: true });
    } catch (err) {
      const detail =
        err.response?.data?.detail ||
        err.response?.data?.non_field_errors?.[0] ||
        Object.values(err.response?.data || {})[0];
      setError(detail || "No fue posible actualizar la contraseña.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="admin-auth-layout">
      <div className="admin-auth-card">
        <h1>Actualiza tu contraseña</h1>
        <p className="admin-auth-subtitle">
          Por seguridad, debes definir una nueva contraseña antes de continuar utilizando el panel.
        </p>
        {error && <div className="admin-auth-alert">{error}</div>}
        {success && <div className="admin-auth-alert" style={{ background: "rgba(34,197,94,0.12)", color: "#15803d" }}>{success}</div>}
        <form className="admin-auth-form" onSubmit={handleSubmit}>
          <label htmlFor="old_password">Contraseña actual</label>
          <input
            id="old_password"
            name="old_password"
            type="password"
            autoComplete="current-password"
            value={form.old_password}
            onChange={handleChange}
            required
          />

          <label htmlFor="new_password">Nueva contraseña</label>
          <input
            id="new_password"
            name="new_password"
            type="password"
            autoComplete="new-password"
            value={form.new_password}
            onChange={handleChange}
            required
          />

          <label htmlFor="confirm_password">Confirmar nueva contraseña</label>
          <input
            id="confirm_password"
            name="confirm_password"
            type="password"
            autoComplete="new-password"
            value={form.confirm_password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="admin-auth-button" disabled={isSubmitting}>
            {isSubmitting ? "Guardando…" : "Guardar contraseña"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminPasswordChange;
