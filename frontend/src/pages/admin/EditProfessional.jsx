import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { getProfessionalById, updateProfessional } from "../../services/api";

function EditProfessional() {
  const { id } = useParams(); // Obtenemos el ID de la URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre_completo: "",
    titulo_profesional: "",
    especialidad: "",
    biografia: "",
    años_experiencia: 0,
    calendly_username: "",
    tipo_servicio: "",
    activo: true,
    orden: 0,
  });
  const [foto, setFoto] = useState(null); // Archivo nuevo (si se sube)
  const [fotoPreview, setFotoPreview] = useState(null); // URL de foto actual
  const [loading, setLoading] = useState(true);

  // 1. Cargar datos al iniciar
  useEffect(() => {
    loadProfessional();
  }, [id]);

  const loadProfessional = async () => {
    try {
      const res = await getProfessionalById(id);
      const data = res.data;
      setForm({
        nombre_completo: data.nombre_completo,
        titulo_profesional: data.titulo_profesional,
        especialidad: data.especialidad,
        biografia: data.biografia || "", // Manejar si viene null
        años_experiencia: data.años_experiencia,
        calendly_username: data.calendly_username,
        tipo_servicio: data.tipo_servicio,
        activo: data.activo,
        orden: data.orden,
      });
      if (data.foto) setFotoPreview(data.foto);
      setLoading(false);
    } catch (error) {
      alert("Error cargando el profesional.");
      navigate("/admin-panel/dashboard");
    }
  };

  // 2. Manejar guardado
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    // Agregamos todos los campos de texto
    Object.keys(form).forEach((key) => {
      // Evitamos enviar nulls que rompan el backend
      data.append(key, form[key] !== null ? form[key] : "");
    });

    // Solo agregamos foto si el usuario seleccionó una NUEVA
    if (foto) {
      data.append("foto", foto);
    }

    try {
      await updateProfessional(id, data);
      alert("¡Cambios guardados correctamente!");
      navigate("/admin-panel/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar. Verifica los datos.");
    }
  };

  if (loading)
    return <div className="container mt-5 text-center">Cargando datos...</div>;

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Editar Profesional</h3>
        <Link to="/admin-panel/dashboard" className="btn btn-outline-secondary">
          ← Volver al Dashboard
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Columna Izquierda: Datos */}
              <div className="col-md-8">
                <div className="mb-3">
                  <label className="form-label">Nombre Completo *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={form.nombre_completo}
                    onChange={(e) =>
                      setForm({ ...form, nombre_completo: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Título Profesional *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={form.titulo_profesional}
                    onChange={(e) =>
                      setForm({ ...form, titulo_profesional: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Especialidad *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={form.especialidad}
                    onChange={(e) =>
                      setForm({ ...form, especialidad: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Biografía *</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    required
                    value={form.biografia}
                    onChange={(e) =>
                      setForm({ ...form, biografia: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Columna Derecha: Foto y Config */}
              <div className="col-md-4">
                <div className="card bg-light mb-3">
                  <div className="card-body text-center">
                    <label className="form-label d-block">Foto Actual</label>
                    {fotoPreview ? (
                      <img
                        src={fotoPreview}
                        alt="Actual"
                        className="img-fluid rounded mb-2"
                        style={{ maxHeight: "150px" }}
                      />
                    ) : (
                      <p className="text-muted">Sin foto</p>
                    )}

                    <label className="btn btn-sm btn-primary mt-2">
                      Cambiar Foto
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => {
                          setFoto(e.target.files[0]);
                          setFotoPreview(
                            URL.createObjectURL(e.target.files[0])
                          ); // Preview local
                        }}
                      />
                    </label>
                    {foto && (
                      <div className="small text-success mt-1">
                        Nueva imagen seleccionada
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Años Exp.</label>
                  <input
                    type="number"
                    className="form-control"
                    value={form.años_experiencia}
                    onChange={(e) =>
                      setForm({ ...form, años_experiencia: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Username Calendly</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={form.calendly_username}
                    onChange={(e) =>
                      setForm({ ...form, calendly_username: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Tipo Servicio</label>
                  <select
                    className="form-select"
                    value={form.tipo_servicio}
                    onChange={(e) =>
                      setForm({ ...form, tipo_servicio: e.target.value })
                    }
                  >
                    <option value="psicologia">Psicología</option>
                    <option value="metodologia">Metodología</option>
                  </select>
                </div>
              </div>
            </div>

            <hr />
            <div className="d-flex justify-content-end gap-2">
              <Link to="/admin-panel/dashboard" className="btn btn-secondary">
                Cancelar
              </Link>
              <button type="submit" className="btn btn-primary px-4">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditProfessional;
