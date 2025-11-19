import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createProfessional } from "../../services/api";

function CreateProfessional() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre_completo: "",
    titulo_profesional: "",
    especialidad: "",
    biografia: "", // Campo biografía
    años_experiencia: 0,
    calendly_username: "",
    tipo_servicio: "psicologia",
    activo: true,
    orden: 0,
  });
  const [foto, setFoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (foto) data.append("foto", foto);

    try {
      await createProfessional(data);
      alert("¡Profesional creado exitosamente!");
      navigate("/admin-panel/dashboard");
    } catch (error) {
      console.error(error);
      alert(
        "Error creando profesional. Revisa que el username de Calendly no esté repetido."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Nuevo Profesional</h3>
        {/* Botón Volver Arriba */}
        <Link to="/admin-panel/dashboard" className="btn btn-outline-secondary">
          ← Volver al Dashboard
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Nombre Completo *</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) =>
                    setForm({ ...form, nombre_completo: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Título Profesional *</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) =>
                    setForm({ ...form, titulo_profesional: e.target.value })
                  }
                />
              </div>

              <div className="col-md-12 mb-3">
                <label className="form-label">Especialidad *</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Ej: Ansiedad, Tesis cualitativa..."
                  onChange={(e) =>
                    setForm({ ...form, especialidad: e.target.value })
                  }
                />
              </div>

              {/* NUEVO CAMPO BIOGRAFÍA */}
              <div className="col-md-12 mb-3">
                <label className="form-label">Biografía *</label>
                <textarea
                  className="form-control"
                  rows="4"
                  required
                  placeholder="Describe la experiencia y enfoque del profesional..."
                  onChange={(e) =>
                    setForm({ ...form, biografia: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Foto de Perfil</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => setFoto(e.target.files[0])}
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Años Experiencia</label>
                <input
                  type="number"
                  className="form-control"
                  min="0"
                  onChange={(e) =>
                    setForm({ ...form, años_experiencia: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Calendly Username *</label>
                <div className="input-group">
                  <span className="input-group-text">@</span>
                  <input
                    type="text"
                    className="form-control"
                    required
                    placeholder="maria-gonzalez"
                    onChange={(e) =>
                      setForm({ ...form, calendly_username: e.target.value })
                    }
                  />
                </div>
                <small className="text-muted">
                  Solo el usuario, sin la URL completa.
                </small>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tipo de Servicio</label>
                <select
                  className="form-select"
                  onChange={(e) =>
                    setForm({ ...form, tipo_servicio: e.target.value })
                  }
                >
                  <option value="psicologia">Psicología</option>
                  <option value="metodologia">Metodología</option>
                </select>
              </div>
            </div>

            <hr className="my-4" />

            <div className="d-flex gap-2 justify-content-end">
              <Link to="/admin-panel/dashboard" className="btn btn-secondary">
                Cancelar
              </Link>
              <button
                type="submit"
                className="btn btn-success px-4"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar Profesional"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default CreateProfessional;
