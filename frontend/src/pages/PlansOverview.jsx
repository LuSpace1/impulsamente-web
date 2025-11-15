import { Link } from "react-router-dom";

import "./PlansOverview.css";

const plans = [
  {
    id: "metodologia",
    title: "Plan Metodología",
    description: "Estructura cada capítulo con especialistas en investigación.",
    to: "/planes/metodologia",
    accent: "metodologia",
  },
  {
    id: "integral",
    title: "Plan Integral",
    description: "Integra asesoría metodológica y apoyo emocional en un mismo camino.",
    to: "/planes/integral",
    accent: "integral",
  },
  {
    id: "psicologia",
    title: "Plan Psicología",
    description: "Fortalece tu bienestar emocional durante el proceso de tesis.",
    to: "/planes/psicologia",
    accent: "psicologia",
  },
];

const PlansOverview = () => (
  <section className="plans-overview">
    <div className="plans-overview__container">
      <header className="plans-overview__header">
        <h1>Elige tu plan ImpulsaMente</h1>
        <p>Selecciona el plan que necesitas y agenda con el profesional ideal para ti.</p>
      </header>
      <div className="plans-overview__grid">
        {plans.map((plan) => (
          <Link key={plan.id} to={plan.to} className={`plans-overview__card plans-overview__card--${plan.accent}`}>
            <h2>{plan.title}</h2>
            <p>{plan.description}</p>
            <span className="plans-overview__cta">Explorar profesionales →</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default PlansOverview;
