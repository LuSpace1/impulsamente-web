import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAdminProfessionals,
  logoutAdmin,
  deleteProfessional,
  toggleProfessionalStatus,
} from "../../services/api";

// IMPORTA TU NUEVO COMPONENTE (Ajusta la ruta si es necesario)
import ContactsManager from "../../components/Admin/ContactsManager"; 

function AdminDashboard() {
  // --- ESTADO PARA LAS PESTAÑAS ---
  const [activeTab, setActiveTab] = useState('professionals');

  const [pros, setPros] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === 'professionals') {
      loadData();
    }
  }, [activeTab]);

  const loadData = async () => {
    try {
      const res = await getAdminProfessionals();
      setPros(res.data);
    } catch (error) {
      console.error("Error cargando dashboard", error);
      navigate("/admin-panel/login");
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    navigate("/");
  };

  const handleToggle = async (id, currentStatus) => {
    await toggleProfessionalStatus(id, !currentStatus);
    loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás segura de eliminar este profesional permanentemente?")) {
      await deleteProfessional(id);
      loadData();
    }
  };

  const filteredPros = pros.filter((p) =>
    p.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPros = pros.length;
  const activePros = pros.filter((p) => p.activo).length;
  const inactivePros = totalPros - activePros;

  return (
    <div
      className="container mt-4"
      style={{ paddingTop: "100px", paddingBottom: "50px" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-white shadow-sm rounded">
        <h2 className="m-0 text-primary">Panel de Administración</h2>
        <button
          onClick={handleLogout}
          className="btn btn-outline-danger btn-sm"
        >
          Cerrar Sesión
        </button>
      </div>

      {/* --- BOTONES DE PESTAÑAS --- */}
      <div className="d-flex gap-2 mb-4">
        <button
          className={`btn ${
            activeTab === "professionals"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() => setActiveTab("professionals")}
        >
          👔 Gestionar Profesionales
        </button>
        <button
          className={`btn ${
            activeTab === "contacts" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setActiveTab("contacts")}
        >
          📩 Bandeja de Entrada
        </button>
      </div>

      {/* --- CONTENIDO DINÁMICO --- */}
      {activeTab === "professionals" ? (
        /* === VISTA DE PROFESIONALES === */
        <div className="professionals-content fade-in">
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card text-white bg-primary mb-3 shadow-sm">
                <div className="card-body text-center">
                  <h6 className="card-title">Total Profesionales</h6>
                  <h2 className="display-4 fw-bold">{totalPros}</h2>
                </div>
              </div>
            </div>
            {/* ... Tus otras tarjetas ... */}
            <div className="col-md-4">
              <div className="card text-white bg-success mb-3 shadow-sm">
                <div className="card-body text-center">
                  <h6 className="card-title">Activos</h6>
                  <h2 className="display-4 fw-bold">{activePros}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-secondary mb-3 shadow-sm">
                <div className="card-body text-center">
                  <h6 className="card-title">Inactivos</h6>
                  <h2 className="display-4 fw-bold">{inactivePros}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="🔍 Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-6 text-end">
              <Link
                to="/admin-panel/profesionales/nuevo"
                className="btn btn-primary"
              >
                + Nuevo Profesional
              </Link>
            </div>
          </div>

          <div className="table-responsive shadow-sm rounded">
            <table className="table table-hover align-middle mb-0 bg-white">
              <thead className="table-dark">
                <tr>
                  <th>Foto</th>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredPros.length > 0 ? (
                  filteredPros.map((p) => (
                    <tr key={p.id}>
                      <td>
                        {p.foto ? (
                          <img
                            src={p.foto}
                            alt="avatar"
                            style={{
                              width: "45px",
                              height: "45px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              border: "2px solid #dee2e6",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "45px",
                              height: "45px",
                              borderRadius: "50%",
                              background: "#ccc",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            📷
                          </div>
                        )}
                      </td>
                      <td className="fw-bold">{p.nombre_completo}</td>
                      <td>
                        {p.tipo_servicio === "psicologia" ? (
                          <span className="badge bg-info text-dark">
                            Psicología
                          </span>
                        ) : (
                          <span className="badge bg-warning text-dark">
                            Metodología
                          </span>
                        )}
                      </td>
                      <td>
                        {p.activo ? (
                          <span className="badge bg-success">Activo</span>
                        ) : (
                          <span className="badge bg-secondary">Inactivo</span>
                        )}
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Link
                            to={`/admin-panel/profesionales/${p.id}/editar`}
                            className="btn btn-primary btn-sm"
                          >
                            ✏️ Editar
                          </Link>
                          <button
                            onClick={() => handleToggle(p.id, p.activo)}
                            className={`btn btn-sm ${
                              p.activo
                                ? "btn-outline-warning"
                                : "btn-outline-success"
                            }`}
                          >
                            {p.activo ? "Desactivar" : "Activar"}
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="btn btn-outline-danger btn-sm"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      No se encontraron profesionales.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <ContactsManager />
      )}
    </div>
  );
}

export default AdminDashboard;
