import { useEffect, useMemo, useState } from "react";

import { useAdminAuth } from "../../context/AdminAuthContext.jsx";
import {
  adminCreateProfessional,
  adminDeleteProfessional,
  adminListProfessionals,
  adminToggleProfessional,
  adminUpdateProfessional,
} from "../../services/api.js";
import "./AdminStyles.css";

const SERVICE_OPTIONS = [
  { value: "", label: "Todos los servicios" },
  { value: "metodologia", label: "Metodología" },
  { value: "integral", label: "Plan Integral" },
  { value: "psicologia", label: "Psicología" },
];

const initialForm = {
  nombre_completo: "",
  titulo_profesional: "",
  especialidad: "",
  biografia: "",
  años_experiencia: "",
  calendly_url: "",
  tipo_servicio: "metodologia",
  activo: true,
  orden: 0,
  foto: null,
};

const extractError = (error) => {
  const data = error.response?.data;
  if (!data) return "";
  if (typeof data.detail === "string") return data.detail;
  if (Array.isArray(data.non_field_errors) && data.non_field_errors.length) {
    return data.non_field_errors[0];
  }
  const firstValue = Object.values(data)[0];
  if (Array.isArray(firstValue) && firstValue.length) {
    return firstValue[0];
  }
  if (typeof firstValue === "string") {
    return firstValue;
  }
  return "";
};

const ProfessionalsDashboard = () => {
  const { user, logout } = useAdminAuth();
  const [professionals, setProfessionals] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ service: "", active: "all" });
  const [modalState, setModalState] = useState({ open: false, mode: "create", professional: null });
  const [formState, setFormState] = useState(initialForm);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);

  const filteredProfessionals = useMemo(() => professionals, [professionals]);

  const loadProfessionals = () => {
    setStatus("loading");
    setError("");
    const params = {};
    if (filters.service) params.service = filters.service;
    if (filters.active !== "all") params.active = filters.active;
    adminListProfessionals(params)
      .then((response) => {
        setProfessionals(response.data);
        setStatus("ready");
      })
      .catch(() => {
        setProfessionals([]);
        setStatus("error");
        setError("No se pudieron cargar los profesionales.");
      });
  };

  useEffect(() => {
    loadProfessionals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.service, filters.active]);

  const openCreateModal = () => {
    setFormState(initialForm);
    setPreview("");
    setModalState({ open: true, mode: "create", professional: null });
  };

  const openEditModal = (professional) => {
    setFormState({
      nombre_completo: professional.nombre_completo,
      titulo_profesional: professional.titulo_profesional || "",
      especialidad: professional.especialidad || "",
      biografia: professional.biografia || "",
      años_experiencia: professional.años_experiencia ?? "",
      calendly_url: professional.calendly_url,
      tipo_servicio: professional.tipo_servicio,
      activo: professional.activo,
      orden: professional.orden,
      foto: null,
    });
    setPreview(professional.foto_url || "");
    setModalState({ open: true, mode: "edit", professional });
  };

  const closeModal = () => {
    setModalState({ open: false, mode: "create", professional: null });
    setFormState(initialForm);
    setPreview("");
    setSaving(false);
  };

  const handleFormChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    if (type === "checkbox") {
      setFormState((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const file = files?.[0];
      setFormState((prev) => ({ ...prev, foto: file }));
      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const buildFormData = () => {
    const data = new FormData();
    data.append("nombre_completo", formState.nombre_completo);
    data.append("titulo_profesional", formState.titulo_profesional);
    data.append("especialidad", formState.especialidad);
    data.append("biografia", formState.biografia);
    if (formState.años_experiencia !== "" && formState.años_experiencia !== null) {
      data.append("años_experiencia", formState.años_experiencia);
    } else if (modalState.mode === "edit") {
      data.append("años_experiencia", "");
    }
    data.append("calendly_url", formState.calendly_url);
    data.append("tipo_servicio", formState.tipo_servicio);
    data.append("activo", formState.activo);
    data.append("orden", formState.orden);
    if (formState.foto) {
      data.append("foto", formState.foto);
    }
    return data;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = buildFormData();
      if (modalState.mode === "create") {
        await adminCreateProfessional(payload);
      } else if (modalState.professional) {
        await adminUpdateProfessional(modalState.professional.id, payload);
      }
      closeModal();
      loadProfessionals();
    } catch (err) {
      const detail = extractError(err);
      setError(detail || "No se pudo guardar la información del profesional.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (professional) => {
    if (!window.confirm(`¿Eliminar a ${professional.nombre_completo}? Esta acción no se puede deshacer.`)) {
      return;
    }
    try {
      await adminDeleteProfessional(professional.id);
      loadProfessionals();
    } catch (err) {
      const detail = extractError(err);
      setError(detail || "No fue posible eliminar al profesional.");
    }
  };

  const handleToggle = async (professional) => {
    try {
      await adminToggleProfessional(professional.id);
      loadProfessionals();
    } catch (err) {
      const detail = extractError(err);
      setError(detail || "No se pudo actualizar el estado del profesional.");
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <section className="admin-dashboard-layout">
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-header">
          <div>
            <h1>Profesionales ImpulsaMente</h1>
            <p>Gestiona perfiles, agendas de Calendly y disponibilidad desde un único lugar.</p>
          </div>
          <div className="admin-dashboard-actions">
            <div className="admin-dashboard-filters">
              <select
                value={filters.service}
                onChange={(event) => setFilters((prev) => ({ ...prev, service: event.target.value }))}
              >
                {SERVICE_OPTIONS.map((option) => (
                  <option key={option.value || "all"} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                value={filters.active}
                onChange={(event) => setFilters((prev) => ({ ...prev, active: event.target.value }))}
              >
                <option value="all">Activos e inactivos</option>
                <option value="true">Solo activos</option>
                <option value="false">Solo inactivos</option>
              </select>
            </div>
            <button type="button" className="admin-dashboard-button" onClick={openCreateModal}>
              Añadir profesional
            </button>
            <button type="button" className="admin-secondary-button" onClick={handleLogout}>
              Cerrar sesión ({user?.username})
            </button>
          </div>
        </div>

        {error && <div className="admin-auth-alert">{error}</div>}

        {status === "loading" && <div className="page-loader">Cargando profesionales…</div>}

        {status === "ready" && filteredProfessionals.length === 0 && (
          <div className="admin-auth-alert" style={{ background: "rgba(74,58,255,0.08)", color: "#4a3aff" }}>
            No encontramos profesionales con los filtros seleccionados.
          </div>
        )}

        {filteredProfessionals.length > 0 && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Servicio</th>
                  <th>Calendly</th>
                  <th>Estado</th>
                  <th>Orden</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfessionals.map((professional) => (
                  <tr key={professional.id}>
                    <td>
                      <strong>{professional.nombre_completo}</strong>
                      <br />
                      <small>{professional.titulo_profesional}</small>
                    </td>
                    <td>{SERVICE_OPTIONS.find((option) => option.value === professional.tipo_servicio)?.label}</td>
                    <td>
                      <a href={professional.calendly_url} target="_blank" rel="noreferrer">
                        {professional.calendly_url}
                      </a>
                    </td>
                    <td>
                      <span
                        className={`admin-dashboard-tag ${
                          professional.activo ? "admin-dashboard-tag--active" : "admin-dashboard-tag--inactive"
                        }`}
                      >
                        {professional.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td>{professional.orden}</td>
                    <td>
                      <div className="admin-dashboard-actions" style={{ gap: "0.5rem" }}>
                        <button type="button" className="admin-secondary-button" onClick={() => openEditModal(professional)}>
                          Editar
                        </button>
                        <button type="button" className="admin-secondary-button" onClick={() => handleToggle(professional)}>
                          {professional.activo ? "Desactivar" : "Activar"}
                        </button>
                        <button
                          type="button"
                          className="admin-secondary-button admin-danger"
                          onClick={() => handleDelete(professional)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalState.open && (
        <div className="admin-modal-backdrop" role="dialog" aria-modal="true">
          <div className="admin-modal">
            <h2>{modalState.mode === "create" ? "Nuevo profesional" : "Editar profesional"}</h2>
            <form className="admin-auth-form" onSubmit={handleSubmit}>
              <label htmlFor="nombre_completo">Nombre completo</label>
              <input
                id="nombre_completo"
                name="nombre_completo"
                value={formState.nombre_completo}
                onChange={handleFormChange}
                required
              />

              <label htmlFor="titulo_profesional">Título profesional</label>
              <input
                id="titulo_profesional"
                name="titulo_profesional"
                value={formState.titulo_profesional}
                onChange={handleFormChange}
              />

              <label htmlFor="especialidad">Especialidad</label>
              <input
                id="especialidad"
                name="especialidad"
                value={formState.especialidad}
                onChange={handleFormChange}
              />

              <label htmlFor="biografia">Biografía</label>
              <textarea
                id="biografia"
                name="biografia"
                rows="3"
                value={formState.biografia}
                onChange={handleFormChange}
              />

              <label htmlFor="años_experiencia">Años de experiencia</label>
              <input
                id="años_experiencia"
                name="años_experiencia"
                type="number"
                min="0"
                value={formState.años_experiencia}
                onChange={handleFormChange}
              />

              <label htmlFor="calendly_url">URL de Calendly</label>
              <input
                id="calendly_url"
                name="calendly_url"
                type="url"
                placeholder="https://calendly.com/usuario"
                value={formState.calendly_url}
                onChange={handleFormChange}
                required
              />

              <label htmlFor="tipo_servicio">Tipo de servicio</label>
              <select id="tipo_servicio" name="tipo_servicio" value={formState.tipo_servicio} onChange={handleFormChange}>
                {SERVICE_OPTIONS.filter((option) => option.value).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <label htmlFor="orden">Orden de aparición</label>
              <input id="orden" name="orden" type="number" value={formState.orden} onChange={handleFormChange} />

              <label className="admin-upload">
                Fotografía del profesional
                <input name="foto" type="file" accept="image/*" onChange={handleFormChange} />
              </label>
              {preview && (
                <img src={preview} alt="Vista previa" style={{ maxHeight: "180px", borderRadius: "12px" }} />
              )}

              <label className="admin-toggle">
                <input
                  type="checkbox"
                  name="activo"
                  checked={formState.activo}
                  onChange={handleFormChange}
                />
                Disponible para agendamiento
              </label>

              <div className="admin-modal-actions">
                <button type="button" className="admin-secondary-button" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="admin-dashboard-button" disabled={saving}>
                  {saving ? "Guardando…" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfessionalsDashboard;
