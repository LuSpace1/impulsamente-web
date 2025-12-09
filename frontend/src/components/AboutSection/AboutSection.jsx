import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section id="nosotros" className="about-section">
      <Container>
        <Row className="align-items-center">

          {/* === COLUMNA IZQUIERDA (TEXTO) === */}
          <Col md={7} className="mb-4 mb-md-0">
            <p className="about-subtitle">SOBRE IMPULSAMENTE</p>
            <h2 className="about-title">
              Transformando el Proceso de Tesis en una Experiencia de Crecimiento
            </h2>

            <div className="about-text-content">
              <h5 className="fw-bold">¿Quiénes somos?</h5>
              <p>
                ImpulsaMente nace de la unión de Impulsa Tesis y Divermente, dos proyectos con
                amplia experiencia en acompañamiento académico y psicológico. Somos un equipo de
                profesionales comprometidos con el éxito de cada tesista.
              </p>

              <h5 className="fw-bold mt-4">¿Por qué ImpulsaMente?</h5>
              <p>
                Entendemos que el proceso de tesis no solo requiere habilidades metodológicas, sino
                también fortaleza emocional. Por eso ofrecemos un acompañamiento integral que cuida
                tanto tu desarrollo académico como tu bienestar mental.
              </p>

              <h5 className="fw-bold mt-4">Nuestra Visión</h5>
              <p>
                Ser el referente en acompañamiento integral para tesistas, transformando cada proceso
                de titulación en una experiencia de crecimiento personal y profesional.
              </p>
            </div>
          </Col>

          {/* === COLUMNA DERECHA (TARJETA DE CARACTERÍSTICAS) === */}
          <Col md={5}>
            <Card className="feature-card shadow-lg">
              <Card.Body>

                {/* --- Feature 1 (Ícono de Medalla) --- */}
                <div className="feature-item">
                  <div className="feature-icon icon-excelencia">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="7"></circle>
                      <polyline points="8.21 13.89 7 22 12 17 17 22 15.79 13.88"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Excelencia Académica</h6>
                    <p className="mb-0">
                      Metodologías probadas y actualizadas para el desarrollo de
                      investigaciones de alto nivel.
                    </p>
                  </div>
                </div>

                {/* --- Feature 2 (Ícono de Escudo/Bienestar) --- */}
                <div className="feature-item">
                  <div className="feature-icon icon-bienestar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Bienestar Integral</h6>
                    <p className="mb-0">
                      Cuidado de la salud mental y emocional durante todos tus procesos.
                    </p>
                  </div>
                </div>

                {/* --- Feature 3 (Ícono de Persona) --- */}
                <div className="feature-item">
                  <div className="feature-icon icon-personalizado">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Acompañamiento Personalizado</h6>
                    <p className="mb-0">
                      Atención adaptada a las necesidades únicas de cada estudiante.
                    </p>
                  </div>
                </div>

              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;