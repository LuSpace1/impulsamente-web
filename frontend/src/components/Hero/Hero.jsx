import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'; 
// 1. ESTA ES LA IMPORTACIÓN CORREGIDA (según tu estructura de archivos)
import Statistics from '../Statistics/Statistics.jsx'; 

const Hero = () => {
  // --- Colores personalizados del Mockup ---
  const colorApoyo = '#f4c7c7'; 
  const colorIntegral = '#c4e4d4'; 
  const colorBoton = '#F89880';; 

  // --- Estilos para el fondo degradado (ACTUALIZADOS A TU IMAGEN) ---
  const heroStyle = {
    // Este es el gradiente de tu imagen (rosa pálido -> blanco -> azul pálido)
    backgroundImage: `linear-gradient(
      135deg, 
      rgba(248, 152, 128, 0.2), /* Rosa/Coral pálido de tu imagen */
      rgba(255, 255, 255, 0.5),  /* Blanco translúcido en el centro */
      rgba(135, 206, 235, 0.2)  /* Azul pálido de tu imagen */
    )`,
    paddingTop: '5rem',
    paddingBottom: '5rem',
    overflow: 'hidden',
  };

  return (
    /* === 1. FONDO DEGRADADO APLICADO AQUÍ === */
    <Container fluid style={heroStyle}>
      <Container>
        {/* --- El "Marco" Blanco --- */}
       <Row className="bg-white rounded-4 shadow-lg align-items-stretch overflow-hidden">

          {/* === Columna Izquierda (Texto y CTA) === */}
          <Col md={6} className="p-4 p-md-5 text-center text-md-start d-flex flex-column justify-content-center">
            
            <div> {/* Contenedor extra para agrupar el texto */}
              
              {/* === 2. TEXTO CON GRADIENTE (MANTENIDO) === */}
              <div 
                className="d-inline-block px-3 py-1 mb-3" 
                style={{ 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem' 
                }}
              >
                <span 
                  style={{
                    background: 'linear-gradient(to right, #F89880, #B5A8C8, #88C0D0, #8FBC8F)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    fontWeight: 600
                  }}
                >
                  Impulsa Tesis + Divermente
                </span>
              </div>
              {/* --- FIN BLOQUE GRADIENTE --- */}


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
                  variant="outline-primary" // Usamos "outline" como base
                  size="lg" 
                  className="fw-bold"
                  style={{
                    // 1. Usamos la variable 'colorBoton' para el borde y el texto
                    color: colorBoton,
                    borderColor: colorBoton,

                    // 2. MAGIA CREATIVA: 
                    // Sobreescribimos las variables de Bootstrap para el 'hover'
                    // Así, cuando pases el mouse, se rellenará del color coral.
                    '--bs-btn-hover-bg': colorBoton,
                    '--bs-btn-hover-color': '#ffffff',
                    '--bs-btn-active-bg': colorBoton,
                    '--bs-btn-active-color': '#ffffff',
                    '--bs-btn-active-border-color': colorBoton,

                    // 3. (Opcional) Sobreescribimos el 'focus' para que no brille azul
                    '--bs-btn-focus-shadow-rgb': '248, 152, 128'
                  }}
                >
                  Contactar
                </Button>
              </div>
            </div>
            <Statistics />
          </Col>

          {/* === 3. IMAGEN EN SU LUGAR (SIN ERRORES) === */}
          <Col md={6} className="p-0">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto-format&fit-crop" 
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