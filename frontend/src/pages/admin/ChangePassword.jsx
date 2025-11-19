import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../services/api";

function ChangePassword() {
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // 1. Validaciones del frontend
    if (form.new_password !== form.confirm_password) {
      setError("Las contraseñas nuevas no coinciden.");
      return;
    }
    if (form.new_password.length < 8) {
      setError("La nueva contraseña debe tener al menos 8 caracteres.");
      return;
    }

    // 2. Enviar al backend
    try {
      const res = await changePassword({
        current_password: form.current_password,
        new_password: form.new_password,
      });

      if (res.data.success) {
        setSuccess("¡Contraseña actualizada con éxito! Redirigiendo...");
        // Esperamos 2 segundos para que leas el mensaje y te mandamos al dashboard
        setTimeout(() => {
          navigate("/admin-panel/dashboard");
        }, 2000);
      }
    } catch (err) {
      // Si el backend responde error (ej: contraseña actual incorrecta)
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Ocurrió un error al cambiar la contraseña.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h3 className="text-center mb-3">🔒 Cambiar Contraseña</h3>

              <div className="alert alert-warning">
                <small>
                  Por seguridad, debes cambiar tu contraseña temporal antes de
                  continuar.
                </small>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    Contraseña Actual (Temporal)
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    value={form.current_password}
                    onChange={(e) =>
                      setForm({ ...form, current_password: e.target.value })
                    }
                  />
                </div>

                <hr />

                <div className="mb-3">
                  <label className="form-label">Nueva Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    placeholder="Mínimo 8 caracteres"
                    value={form.new_password}
                    onChange={(e) =>
                      setForm({ ...form, new_password: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Confirmar Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    value={form.confirm_password}
                    onChange={(e) =>
                      setForm({ ...form, confirm_password: e.target.value })
                    }
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Guardar Nueva Contraseña
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
