import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'; 
import Statistics from '../Statistics/Statistics.jsx'; 

const Hero = () => {
  const colorBoton = '#F89880';

  // --- Estilos del Texto Gradiente ---
  const gradientText = {
    background: 'linear-gradient(to right, #F89880, #B5A8C8, #88C0D0, #8FBC8F)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    fontWeight: 600,
    display: 'inline-block',
    paddingBottom: '0.2em', 
    paddingTop: '0.2em',    
    lineHeight: '1.2' 
  };

  // --- NUEVO FONDO ---
  const heroStyle = {
    backgroundImage: 'linear-gradient(to right, #FFF0E5 0%, #FFFFFF 50%, #E0F7FA 100%)',
    paddingTop: '5rem',
    paddingBottom: '5rem',
    overflow: 'hidden',
  };

  const buttonStyle = {
    backgroundColor: colorBoton, 
    color: '#ffffff',
    fontWeight: 'bold',
    border: 'none' 
  };

  return (
    <Container fluid style={heroStyle}>
      <Container>
        <Row className="bg-white rounded-4 shadow-lg align-items-stretch overflow-hidden g-0">

          {/* === Columna Izquierda === */}
          <Col md={6} className="p-4 p-md-5 text-center text-md-start d-flex flex-column justify-content-center">
            
            <div>
              {/* Badge Centrado */}
              <div className="d-flex justify-content-center mb-3">
                <div 
                  className="d-inline-flex align-items-center px-3 py-1" 
                  style={{ 
                    backgroundColor: '#f8f9fa', 
                    borderRadius: '20px', 
                    fontSize: '0.9rem' 
                  }}
                >
                  <span style={gradientText}>
                    Impulsa Tesis + Divermente
                  </span>
                </div>
              </div>

              {/* Título */}
              <h1 className="display-4 fw-bold">
                Impulsa tu Tesis con{' '}
                <span style={gradientText}>
                  Apoyo Integral
                </span>
              </h1>

              <p className="lead my-4">
                Potenciamos tu camino académico combinando
                <strong> metodología experta</strong> con 
                <strong> acompañamiento psicológico</strong> personalizado.
              </p>

              {/* Botones */}
              <div className="d-grid gap-3 d-md-flex justify-content-md-start mb-4">
                <Button size="lg" className="me-md-2" style={buttonStyle}>
                  Ver Planes
                </Button>
                
                <Button size="lg" className="" style={buttonStyle}>
                  Contactar
                </Button>
              </div>
            </div>
            
            <Statistics />
          </Col>

          {/* === Columna Derecha (Imagen Web) === */}
          <Col md={6} className="p-0">
            <div 
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto-format&fit-crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%',
                minHeight: '300px', 
                width: '100%'
              }}
              aria-label="Estudiantes colaborando"
            />
          </Col>

        </Row> 
      </Container> 
    </Container> 
  );
};

export default Hero;