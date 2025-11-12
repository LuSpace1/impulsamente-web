// frontend/src/components/Statistics/Statistics.jsx

import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Statistics = () => {

  // --- Colores personalizados del Mockup ---
  const colorTesis = '#f4c7c7'; // Rosa pálido
  const colorExito = '#c4e4d4'; // Verde pálido
  const colorAlumnos = '#c4e4d4'; // Verde pálido 

  // Estilo para cada caja de estadística
  const statBoxStyle = {
    backgroundColor: '#f8f9fa', // Fondo gris claro
    borderRadius: '0.5rem', // Bordes redondeados
  };

  return (
    // Usamos una Fila (Row) de Bootstrap para alinear las estadísticas
    <Row className="mt-5"> {/* 'mt-5' = margen superior grande */}

      {/* Estadística 1 */}
      <Col md={4} className="text-center mb-3 mb-md-0">
        <div className="p-3" style={statBoxStyle}>
          <h4 className="fw-bold mb-0" style={{ color: colorTesis }}>250+</h4>
          <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Tesis OK</p>
        </div>
      </Col>

      {/* Estadística 2 */}
      <Col md={4} className="text-center mb-3 mb-md-0">
        <div className="p-3" style={statBoxStyle}>
          <h4 className="fw-bold mb-0" style={{ color: colorExito }}>95%</h4>
          <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Éxito</p>
        </div>
      </Col>

      {/* Estadística 3 */}
      <Col md={4} className="text-center mb-3 mb-md-0">
        <div className="p-3" style={statBoxStyle}>
          <h4 className="fw-bold mb-0" style={{ color: colorAlumnos }}>500+</h4>
          <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Alumnos</p>
        </div>
      </Col>

    </Row>
  );
};

export default Statistics;