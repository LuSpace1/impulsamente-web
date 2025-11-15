import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BackLink from "../common/BackLink.jsx";
import { fetchProfessionalsByService } from "../../services/api";
import ProfessionalCard from "./ProfessionalCard.jsx";
import "./PlanSelectionLayout.css";

const SERVICE_COPY = {
  psicologia: {
    title: "Agenda tu sesión psicológica",
    subtitle:
      "Selecciona a la profesional que mejor se adapte a tus necesidades emocionales y agenda tu sesión en un par de clics.",
  },
  metodologia: {
    title: "Acompañamiento metodológico",
    subtitle:
      "Conecta con nuestros especialistas en metodología para avanzar con claridad en cada capítulo de tu tesis.",
  },
  integral: {
    title: "Plan Integral ImpulsaMente",
    subtitle:
      "Une lo mejor de la asesoría metodológica y el soporte psicológico en un solo plan personalizado.",
  },
};

const PlanSelectionView = ({ service }) => {
  const navigate = useNavigate();
  const [professionals, setProfessionals] = useState([]);
  const [status, setStatus] = useState("loading");
  const copy = SERVICE_COPY[service];

  useEffect(() => {
    let active = true;
    setStatus("loading");
    fetchProfessionalsByService(service)
      .then((response) => {
        if (active) {
          setProfessionals(response.data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (active) {
          setProfessionals([]);
          setStatus("error");
        }
      });
    return () => {
      active = false;
    };
  }, [service]);

  const handleBook = (professional) => {
    navigate(`/agendar/${service}/${professional.id}`, { state: { professionalName: professional.nombre_completo } });
  };

  return (
    <section className="plan-page">
      <div className="plan-page__container">
        <BackLink to="/" label="Volver al inicio" />
        <header className="plan-page__header">
          <h1 className="plan-page__title">{copy?.title ?? "Selecciona un plan"}</h1>
          {copy?.subtitle && <p className="plan-page__subtitle">{copy.subtitle}</p>}
        </header>

        {status === "loading" && (
          <div className="plan-page__empty">Cargando profesionales disponibles…</div>
        )}

        {status === "error" && (
          <div className="plan-page__empty">No pudimos cargar los profesionales. Intenta de nuevo más tarde.</div>
        )}

        {status === "ready" && professionals.length === 0 && (
          <div className="plan-page__empty">Pronto agregaremos profesionales para este plan.</div>
        )}

        {professionals.length > 0 && (
          <div className="plan-page__carousel">
            {professionals.map((professional) => (
              <ProfessionalCard key={professional.id} professional={professional} onBook={handleBook} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default PlanSelectionView;
