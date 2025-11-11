import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'; 
import Statistics from '../Statistics/Statistics.jsx';
const Hero = () => {
  // --- Colores personalizados del Mockup ---
  const colorApoyo = '#f4c7c7'; 
  const colorIntegral = '#c4e4d4'; 
  const colorBoton = '#f4c7c7'; 

  // --- Estilos para el fondo degradado  ---
  const heroStyle = {
    backgroundImage: `linear-gradient(
      135deg, 
      rgba(247, 188, 123, 0.45), /* Naranja pálido (más fuerte) */
      rgba(248, 249, 250, 0.3),  /* Blanco-ish en el centro */
      rgba(115, 203, 244, 0.45)  /* Celeste pálido (más fuerte) */
    )`,
    paddingTop: '5rem',
    paddingBottom: '5rem',
    overflow: 'hidden',
  };

  return (
    <Container fluid style={heroStyle}>
      <Container>
        {/* --- El "Marco" Blanco --- */}
        <Row className="bg-white rounded-3 shadow-lg align-items-stretch overflow-hidden">

          {/* === Columna Izquierda (Texto y CTA) === */}
          <Col md={6} className="p-4 p-md-5 text-center text-md-start d-flex flex-column justify-content-center">
            
            <div> {/* Contenedor extra para agrupar el texto */}
              <div 
                className="d-inline-block px-3 py-1 mb-3" 
                style={{ 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  color: '#6c757d'
                }}
              >
                Impulsa Tesis + Divermente
              </div>

              <h1 className="display-4 fw-bold">
                Impulsa tu Tesis con 
                <span style={{ color: colorApoyo }}> Apoyo</span>
                <span style={{ color: colorIntegral }}> Integral</span>
              </h1>

              <p className="lead my-4">
                Potenciamos tu camino académico combinando
                <strong> metodología experta</strong> con 
                <strong> acompañamiento psicológico</strong> personalizado.
              </p>

              <div className="d-grid gap-3 d-md-flex justify-content-md-start">
                <Button 
                  size="lg" 
                  className="me-md-2"
                  style={{ 
                    backgroundColor: colorBoton, 
                    borderColor: colorBoton, 
                    color: '#ffffff',
                    fontWeight: 'bold'
                  }}
                >
                  Ver Planes
                </Button>
                
                <Button 
                  variant="link" 
                  size="lg" 
                  className="text-dark fw-bold text-decoration-none"
                >
                  Contactar
                </Button>
              </div>
            </div>
            <Statistics />
          </Col>
          <Col md={6} className="p-0">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto-format&fit=crop" 
              alt="Estudiantes colaborando" 
              className="img-fluid rounded-end h-100" 
              style={{ objectFit: 'cover' }}
            />
          </Col>

        </Row> 
      </Container> 
    </Container> 
  );
};

export default Hero;