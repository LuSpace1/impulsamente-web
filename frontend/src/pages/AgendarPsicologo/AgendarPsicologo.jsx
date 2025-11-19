import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getPsicologos } from "../../services/api";
import "../AgendarPsicologo/AgendarPsicologo.css";

function AgendarPsicologo() {
  const [psicologos, setPsicologos] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getPsicologos();
        setPsicologos(res.data.filter((p) => p.activo));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth / 3;
      scrollRef.current.scrollLeft += dir === "left" ? -amount : amount;
    }
  };

  if (loading)
    return (
      <div className="page-container-psi d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  return (
    <div className="page-container-psi pt-5">
      <div className="content-panel container">
        <div className="text-center mb-5">
          <h1 className="title-gradient-psi">Psicología Clínica</h1>
          <p
            className="lead text-secondary"
            style={{ fontWeight: "500", fontSize: "1.1rem" }}
          >
            Encuentra al profesional ideal para acompañarte en tu proceso.
          </p>
        </div>

        {psicologos.length === 0 ? (
          <div className="text-center py-5 text-muted">
            No hay profesionales activos.
          </div>
        ) : (
          <div className="carousel-container">
            <button
              className="nav-btn-circle me-3"
              onClick={() => scroll("left")}
            >
              &#8249;
            </button>

            <div className="scroll-track" ref={scrollRef}>
              {psicologos.map((p) => (
                <div key={p.id} className="profesional-card-wrapper">
                  <div className="card-custom">
                    <div className="card-header-column">
                      {p.foto ? (
                        <img
                          src={p.foto}
                          alt={p.nombre_completo}
                          className="profile-img-large"
                        />
                      ) : (
                        <div className="profile-img-large d-flex align-items-center justify-content-center bg-light text-secondary fs-1 border">
                          {p.nombre_completo.charAt(0)}
                        </div>
                      )}

                      <div className="header-info">
                        <h3 className="prof-name">{p.nombre_completo}</h3>
                        <p className="prof-title">{p.titulo_profesional}</p>
                      </div>
                    </div>

                    <hr className="card-separator" />

                    <div className="card-section">
                      <span className="field-label">Especialidad</span>
                      <div className="specialty-text">{p.especialidad}</div>
                    </div>

                    <div className="card-section flex-grow-1">
                      <span className="field-label">Biografía</span>
                      <div className="desc-truncada">
                        {p.biografia ||
                          "Especialista comprometido con tu bienestar emocional."}
                      </div>
                    </div>

                    <a
                      href={`https://calendly.com/${p.calendly_username}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-card-psi"
                    >
                      Solicitar Cita
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="nav-btn-circle ms-3"
              onClick={() => scroll("right")}
            >
              &#8250;
            </button>
          </div>
        )}
      </div>

      <div className="text-center mt-3 pb-4">
        <Link to="/" className="btn-back-home">
          ← Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
export default AgendarPsicologo;
