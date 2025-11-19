import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getMetodologos } from "../../services/api";
import "../AgendarMetodologo/AgendarMetodologo.css";

function AgendarMetodologo() {
  const [metodologos, setMetodologos] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMetodologos();
        setMetodologos(res.data.filter((p) => p.activo));
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
      <div className="page-container-met d-flex align-items-center justify-content-center">
        <div className="spinner-border text-warning" role="status"></div>
      </div>
    );

  return (
    <div className="page-container-met pt-5">
      <div className="content-panel container">
        <div className="text-center mb-5">
          <h1 className="title-gradient-met">Asesoría Metodológica</h1>
          <p
            className="lead text-secondary"
            style={{ fontWeight: "500", fontSize: "1.1rem" }}
          >
            Expertos listos para guiar tu tesis o proyecto de investigación.
          </p>
        </div>

        {metodologos.length === 0 ? (
          <div className="text-center py-5 text-muted">
            No hay metodólogos activos.
          </div>
        ) : (
          <div className="carousel-container">
            <button
              className="nav-btn-circle-met me-3"
              onClick={() => scroll("left")}
            >
              &#8249;
            </button>

            <div className="scroll-track" ref={scrollRef}>
              {metodologos.map((p) => (
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
                      <span className="field-label">Especialización</span>
                      {/* Texto limpio, sin globo */}
                      <div className="specialty-text">{p.especialidad}</div>
                    </div>

                    <div className="card-section flex-grow-1">
                      <span className="field-label">Biografía</span>
                      <div className="desc-truncada">
                        {p.biografia ||
                          "Experto en metodología de la investigación."}
                      </div>
                    </div>

                    <a
                      href={`https://calendly.com/${p.calendly_username}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-card-met"
                    >
                      📅 Agendar Asesoría
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="nav-btn-circle-met ms-3"
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
export default AgendarMetodologo;