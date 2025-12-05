import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Statistics from "../Statistics/Statistics.jsx";
import "./Hero.css"; // Importamos el CSS nuevo

const Hero = () => {
  const colorBoton = "#F89880";

  // ... (Tus estilos de texto gradient y heroStyle se mantienen igual) ...
  const gradientText = {
    background: "linear-gradient(to right, #F89880, #B5A8C8, #88C0D0, #8FBC8F)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    fontWeight: 600,
  };

  const heroStyle = {
    backgroundColor: 'transparent', 
    paddingTop: '5rem',
    paddingBottom: '5rem',
    overflow: 'hidden',
  };

  const buttonStyle = {
    backgroundColor: colorBoton,
    color: "#ffffff",
    fontWeight: "bold",
    border: "none",
  };

  return (
    <Container fluid style={heroStyle}>
      <Container>
        {/* IMPORTANTE: 
           g-0: Elimina espacios entre columnas (gutters)
           align-items-stretch: Hace que ambas columnas midan lo mismo
        */}
        <Row className="bg-white rounded-4 shadow-lg align-items-stretch g-0">
          {/* === Columna Izquierda (Texto) === */}
          <Col
            md={6}
            className="p-4 p-md-5 text-center text-md-start d-flex flex-column justify-content-center"
          >
            {/* ... Tu contenido de texto ... */}
            <div>
              <div className="d-flex justify-content-center mb-3">
                {/* ... badge ... */}
                <span
                  style={{
                    ...gradientText,
                    border: "1px solid #eee",
                    padding: "5px 15px",
                    borderRadius: "20px",
                    background: "white",
                  }}
                >
                  Impulsa Tesis + Divermente
                </span>
              </div>

              <h1 className="display-4 fw-bold">
                Impulsa tu Tesis con{" "}
                <span style={gradientText}>Apoyo Integral</span>
              </h1>

              <p className="lead my-4">
                Potenciamos tu camino académico combinando
                <strong> metodología experta</strong> con
                <strong> acompañamiento psicológico</strong> personalizado.
              </p>

              <div className="d-grid gap-3 d-md-flex justify-content-md-start mb-4">
                <Button size="lg" className="me-md-2" style={buttonStyle}>
                  Ver Planes
                </Button>
                <Button size="lg" style={buttonStyle}>
                  Contactar
                </Button>
              </div>
            </div>
            <Statistics />
          </Col>

          {/* === Columna Derecha (Imagen) === */}
          <Col md={6} className="hero-image-col">
            <img
              src="https://enlinea.santotomas.cl/web/wp-content/uploads/sites/2/2018/06/tesistas.jpg"
              alt="Estudiantes colaborando"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Hero;
