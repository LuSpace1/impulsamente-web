import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/api";

function AdminLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAdmin(formData);
      if (res.data.success) {
        if (res.data.must_change_password) {
          navigate("/admin-panel/cambiar-password");
        } else {
          navigate("/admin-panel/dashboard");
        }
      }
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    // Contenedor principal con altura mínima y padding superior para compensar el navbar fijo
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", paddingTop: "100px" }}
    >
      <div
        className="card shadow-lg border-0"
        style={{ maxWidth: "450px", width: "100%", borderRadius: "20px" }}
      >
        <div className="card-body p-5">
          <h3 className="text-center mb-4 fw-bold text-dark">
            ImpulsaMente Admin
          </h3>

          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label text-secondary fw-semibold">
                Usuario
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                required
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                style={{ borderRadius: "10px" }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-secondary fw-semibold">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control form-control-lg"
                required
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                style={{ borderRadius: "10px" }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 btn-lg fw-bold mt-2"
              style={{ borderRadius: "10px", background: "#0d6efd" }}
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AdminLogin;
