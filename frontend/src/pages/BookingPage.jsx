import { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import BackLink from "../components/common/BackLink.jsx";
import { fetchProfessionalDetail } from "../services/api";
import "./BookingPage.css";

const SERVICE_PATHS = {
  psicologia: "/planes/psicologia",
  metodologia: "/planes/metodologia",
  integral: "/planes/integral",
};

const BookingPage = () => {
  const { service, professionalId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [professional, setProfessional] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!SERVICE_PATHS[service]) {
      navigate("/", { replace: true });
      return;
    }
    let active = true;
    setStatus("loading");
    fetchProfessionalDetail(professionalId)
      .then((response) => {
        if (!active) return;
        setProfessional(response.data);
        setStatus("ready");
      })
      .catch(() => {
        if (!active) return;
        setStatus("error");
      });
    return () => {
      active = false;
    };
  }, [service, professionalId, navigate]);

  const previousLabel = location.state?.professionalName
    ? `Volver a profesionales (${location.state.professionalName})`
    : "Volver a profesionales";

  if (status === "error") {
    return (
      <section className="booking-page">
        <div className="booking-page__container">
          <BackLink to={SERVICE_PATHS[service]} label="Volver a profesionales" />
          <div className="booking-page__message booking-page__message--error">
            No pudimos cargar la agenda de este profesional.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="booking-page">
      <div className="booking-page__container">
        <BackLink to={SERVICE_PATHS[service]} label={previousLabel} />
        <header className="booking-page__header">
          <h1>Agenda tu sesión</h1>
          {professional && <p>Estás coordinando con {professional.nombre_completo}.</p>}
        </header>
        {status === "loading" && (
          <div className="booking-page__message">Preparando la agenda…</div>
        )}
        {status === "ready" && professional && (
          <div className="booking-page__widget">
            <InlineWidget url={professional.calendly_url} styles={{ minWidth: "320px", height: "720px" }} />
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingPage;
