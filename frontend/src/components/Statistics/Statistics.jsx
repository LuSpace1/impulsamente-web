import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Statistics = () => {

  // 1. Colores sólidos eliminados (ya no se usan)

  // 2. Definir el estilo del gradiente (del logo)
  const gradientTextStyle = {
    background: 'linear-gradient(to right, #F89880, #B5A8C8, #88C0D0, #8FBC8F)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  };

  // Estilo para cada caja de estadística (se mantiene igual)
  const statBoxStyle = {
    backgroundColor: '#f8f9fa', // Fondo gris claro
    borderRadius: '0.5rem', // Bordes redondeados
  };

  return (
    // Usamos una Fila (Row) de Bootstrap para alinear las estadísticas
    <Row className="mt-5"> {/* 'mt-5' = margen superior grande */}

      {/* Estadística 1 --- 3. Aplicar el nuevo estilo */}
      <Col md={4} className="text-center mb-3 mb-md-0">
        <div className="p-3" style={statBoxStyle}>
          <h4 className="fw-bold mb-0" style={gradientTextStyle}>250+</h4>
          <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Tesis OK</p>
        </div>
      </Col>

      {/* Estadística 2 --- 3. Aplicar el nuevo estilo */}
      <Col md={4} className="text-center mb-3 mb-md-0">
        <div className="p-3" style={statBoxStyle}>
          <h4 className="fw-bold mb-0" style={gradientTextStyle}>95%</h4>
          <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Éxito</p>
        </div>
      </Col>

      {/* Estadística 3 --- 3. Aplicar el nuevo estilo */}
        <Col md={4} className="text-center mb-3 mb-md-0">
        <div className="p-3" style={statBoxStyle}>
          <h4 className="fw-bold mb-0" style={gradientTextStyle}>500+</h4>
          <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Alumnos</p>
        </div>
      </Col>

    </Row>
  );
};

export default Statistics;