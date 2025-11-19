import React, { useState } from 'react';
import './ContactForm.css';
import { FaPaperPlane, FaTimes, FaCommentDots } from 'react-icons/fa'; // Importamos íconos nuevos

const ContactForm = () => {
  // Estado para controlar la expansión
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`contact-form-card ${isExpanded ? 'expanded' : ''}`}>
      
      {/* --- HEADER DE LA TARJETA (Siempre visible o cambia según estado) --- */}
      <div className="card-header-content">
        <div className="header-text">
          <h3>¿Listo para empezar?</h3>
          {!isExpanded && <p className="card-description">Déjanos tus datos y te contactaremos.</p>}
        </div>
        
        {/* Botón de cerrar (solo visible cuando está expandido) */}
        {isExpanded && (
          <button 
            className="btn-close-form" 
            onClick={() => setIsExpanded(false)}
            title="Cerrar formulario"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* --- CONTENIDO: Se muestra condicionalmente --- */}
      
      {!isExpanded ? (
        /* VISTA 1: BOTÓN DE LLAMADA A LA ACCIÓN (Compacto) */
        <div className="cta-container">
          <button 
            className="btn-expand-form" 
            onClick={() => setIsExpanded(true)}
          >
            <FaCommentDots className="icon-btn" /> Escribir Consulta
          </button>
        </div>
      ) : (
        /* VISTA 2: EL FORMULARIO COMPLETO (Expandido) */
        <div className="form-content fade-in">
          <input type="text" placeholder="Tu Nombre" className="form-control mb-3" />
          <input type="email" placeholder="Tu Email" className="form-control mb-3" />
          
          <select className="form-control mb-3">
            <option value="">¿Qué servicio te interesa?</option>
            <option value="Psicología">Psicología</option>
            <option value="Metodología">Asesoría Metodológica</option>
            <option value="Plan Integral">Plan Integral</option>
            <option value="Otro">Otro</option>
          </select>
          
          <textarea 
            placeholder="Escribe tu consulta aquí..." 
            className="form-control mb-3"
            rows="3"
          ></textarea>
          
          <button className="btn-solicitar-info">
            Enviar <FaPaperPlane className="icon-send" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactForm;