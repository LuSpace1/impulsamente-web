import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { PopupModal } from "react-calendly";
import { getPsicologos, getMetodologos } from "../../services/api";
import "./AgendarIntegral.css";

function AgendarIntegral() {
  const [psicologos, setPsicologos] = useState([]);
  const [metodologos, setMetodologos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedPsi, setSelectedPsi] = useState(null);
  const [selectedMet, setSelectedMet] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [calendlyStep, setCalendlyStep] = useState(1);

  const scrollRefPsi = useRef(null);
  const scrollRefMet = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [resPsi, resMet] = await Promise.all([
          getPsicologos(),
          getMetodologos(),
        ]);
        setPsicologos(resPsi.data.filter((p) => p.activo));
        setMetodologos(resMet.data.filter((p) => p.activo));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    load();
  }, []);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const amount = ref.current.clientWidth / 3;
      ref.current.scrollLeft += direction === "left" ? -amount : amount;
    }
  };

  const handleContinuar = () => {
    if (selectedPsi && selectedMet) {
      setCalendlyStep(1);
      setIsOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const renderCard = (profesional, tipo, selectedId, onSelect) => {
    const isSelected = selectedId === profesional.id;

    const themeClass = tipo === "psi" ? "theme-psi" : "theme-met";
    const borderClass = isSelected
      ? tipo === "psi"
        ? "border-selected-psi"
        : "border-selected-met"
      : "";
    const badgeBg = tipo === "psi" ? "bg-psi" : "bg-met";
    const btnClass = tipo === "psi" ? "btn-select-psi" : "btn-select-met";
    const btnText = isSelected ? "✓ Seleccionado" : "Seleccionar";

    const btnStyle = isSelected
      ? { backgroundColor: "#28a745", color: "white" }
      : {};

    return (
      <div
        key={profesional.id}
        className="profesional-card-wrapper"
        onClick={() => onSelect(profesional)}
      >
        <div className={`card-selectable ${themeClass} ${borderClass}`}>
          {isSelected && (
            <div className={`check-badge ${badgeBg}`}>✓ Listo</div>
          )}

          <div className="card-header-column">
            {profesional.foto ? (
              <img
                src={profesional.foto}
                alt={profesional.nombre_completo}
                className="profile-img-large"
              />
            ) : (
              <div className="profile-img-large d-flex align-items-center justify-content-center bg-light text-secondary fs-1 border">
                {profesional.nombre_completo.charAt(0)}
              </div>
            )}

            <div className="header-info">
              <h3 className="prof-name">{profesional.nombre_completo}</h3>
              <p className="prof-title">{profesional.titulo_profesional}</p>
            </div>
          </div>

          <hr className="card-separator" />

          <div className="card-section">
            <span className="field-label">ESPECIALIZACIÓN:</span>
            <div className="specialty-text">{profesional.especialidad}</div>
          </div>

          <div className="card-section flex-grow-1">
            <span className="field-label">DESCRIPCIÓN:</span>
            <div className="desc-truncada">
              {profesional.biografia ||
                "Experto listo para acompañarte en tu proceso."}
            </div>
          </div>

          <button className={btnClass} style={btnStyle}>
            {btnText}
          </button>
        </div>
      </div>
    );
  };

  if (loading)
    return (
      <div className="page-container-int d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary"></div>
      </div>
    );

  return (
    <div className="page-container-int pt-5">
      <div className="container text-center mb-3">
        <h1 className="title-rainbow mb-2">Plan Integral</h1>
        <p
          className="lead text-secondary fw-bold"
          style={{ fontSize: "1.2rem" }}
        >
          Combina lo mejor de dos mundos: Salud Mental + Asesoría Metodológica.
        </p>

        <div className="instruction-badge">
          👉 <strong>Instrucción:</strong> Haz clic sobre un profesional de cada
          área.
        </div>
      </div>

      <div className="content-panel container">
        <div className="mb-5">
          <h3 className="section-title-psi mb-4">
            1. Selecciona tu Psicólogo/a
          </h3>
          <div className="carousel-container">
            <button
              className="btn-nav-psi me-3"
              onClick={() => scroll(scrollRefPsi, "left")}
            >
              &#8249;
            </button>
            <div className="scroll-track" ref={scrollRefPsi}>
              {psicologos.map((p) =>
                renderCard(p, "psi", selectedPsi?.id, setSelectedPsi)
              )}
            </div>
            <button
              className="btn-nav-psi ms-3"
              onClick={() => scroll(scrollRefPsi, "right")}
            >
              &#8250;
            </button>
          </div>
        </div>

        <div className="mb-3">
          <h3 className="section-title-met mb-4">
            2. Selecciona tu Metodólogo/a
          </h3>
          <div className="carousel-container">
            <button
              className="btn-nav-met me-3"
              onClick={() => scroll(scrollRefMet, "left")}
            >
              &#8249;
            </button>
            <div className="scroll-track" ref={scrollRefMet}>
              {metodologos.map((p) =>
                renderCard(p, "met", selectedMet?.id, setSelectedMet)
              )}
            </div>
            <button
              className="btn-nav-met ms-3"
              onClick={() => scroll(scrollRefMet, "right")}
            >
              &#8250;
            </button>
          </div>
        </div>
      </div>

      <div className="fixed-bottom footer-integral py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-none d-md-block">
            <small
              className="text-muted d-block text-uppercase fw-bold"
              style={{ fontSize: "0.7rem" }}
            >
              Tu selección:
            </small>
            <span className="fw-bold" style={{ color: "#74b9ff" }}>
              {selectedPsi ? selectedPsi.nombre_completo : "---"}
            </span>
            <span className="mx-2 text-muted">+</span>
            <span className="fw-bold" style={{ color: "#F89880" }}>
              {selectedMet ? selectedMet.nombre_completo : "---"}
            </span>
          </div>

          <button
            onClick={handleContinuar}
            disabled={!selectedPsi || !selectedMet}
            className={`btn btn-lg px-5 rounded-pill fw-bold text-white shadow ${
              !selectedPsi || !selectedMet ? "bg-secondary border-0" : ""
            }`}
            style={
              selectedPsi && selectedMet
                ? { background: "linear-gradient(to right, #74b9ff, #F89880)" }
                : {}
            }
          >
            {!selectedPsi || !selectedMet
              ? "Selecciona ambos"
              : "✨ Agendar Plan Integral"}
          </button>
        </div>
      </div>

      <PopupModal
        url={
          calendlyStep === 1
            ? `https://calendly.com/${selectedPsi?.calendly_username}`
            : `https://calendly.com/${selectedMet?.calendly_username}`
        }
        pageSettings={{
          backgroundColor: "ffffff",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: calendlyStep === 1 ? "74b9ff" : "F89880",
          textColor: "4d5055",
        }}
        open={isOpen}
        onModalClose={handleModalClose}
        rootElement={document.getElementById("root")}
      />

      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 10000,
          }}
        >
          {calendlyStep === 1 ? (
            <button
              className="btn fw-bold shadow-lg rounded-pill text-white px-4 py-3"
              style={{ backgroundColor: "#F89880", border: "none" }}
              onClick={() => setCalendlyStep(2)}
            >
              Listo, ir al Metodólogo 👉
            </button>
          ) : (
            <button
              className="btn btn-success fw-bold shadow-lg rounded-pill px-4 py-3"
              onClick={() => {
                setIsOpen(false);
                alert("¡Felicidades! Proceso completado.");
              }}
            >
              Finalizar todo 🏁
            </button>
          )}
        </div>
      )}

      <div className="text-center mt-3">
        <Link to="/" className="btn-back-home">
          ← Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

export default AgendarIntegral;
