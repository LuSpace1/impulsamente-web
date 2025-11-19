import React, { useState } from 'react';
import './ContactForm.css';
import { 
  FaPaperPlane, 
  FaTimes, 
  FaCommentDots, 
  FaCheckCircle, 
  FaExclamationCircle 
} from 'react-icons/fa';

const ContactForm = () => {
  // 1. Estado para controlar la expansión (Visual)
  const [isExpanded, setIsExpanded] = useState(false);

  // 2. Estado para los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    servicio_interes: '',
    mensaje: ''
  });

  // 3. Estado para el estatus del envío (idle, loading, success, error)
  const [status, setStatus] = useState('idle'); 

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Función para enviar al Backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que se recargue la página
    setStatus('loading');

    try {
      // Conexión con tu API Backend
      const response = await fetch('http://127.0.0.1:8000/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        // Limpiamos el formulario
        setFormData({ nombre: '', email: '', servicio_interes: '', mensaje: '' });
        
        // Cerramos el formulario automáticamente después de 3 segundos
        setTimeout(() => {
            setStatus('idle');
            setIsExpanded(false);
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setStatus('error');
    }
  };

  return (
    <div className={`contact-form-card ${isExpanded ? 'expanded' : ''}`}>
      
      {/* --- HEADER --- */}
      <div className="card-header-content">
        <div className="header-text">
          <h3>¿Listo para empezar?</h3>
          {!isExpanded && <p className="card-description">Déjanos tus datos y te contactaremos.</p>}
        </div>
        
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

      {/* --- CONTENIDO --- */}
      
      {!isExpanded ? (
        /* VISTA 1: BOTÓN DE APERTURA */
        <div className="cta-container">
          <button 
            className="btn-expand-form" 
            onClick={() => setIsExpanded(true)}
          >
            <FaCommentDots className="icon-btn" /> Escribir Consulta
          </button>
        </div>
      ) : (
        /* VISTA 2: FORMULARIO FUNCIONAL */
        <form className="form-content fade-in" onSubmit={handleSubmit}>
          
          {/* Mensajes de Feedback al usuario */}
          {status === 'success' && (
            <div className="alert alert-success" style={{color: 'green', marginBottom: '15px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <FaCheckCircle /> ¡Mensaje enviado con éxito!
            </div>
          )}
          {status === 'error' && (
            <div className="alert alert-error" style={{color: 'red', marginBottom: '15px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <FaExclamationCircle /> Hubo un error. Intenta nuevamente.
            </div>
          )}

          <input 
            type="text" 
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Tu Nombre" 
            className="form-control mb-3" 
            required
          />
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Tu Email" 
            className="form-control mb-3" 
            required
          />
          
          <select 
            name="servicio_interes"
            value={formData.servicio_interes}
            onChange={handleChange}
            className="form-control mb-3"
          >
            <option value="">¿Qué servicio te interesa?</option>
            <option value="Psicología">Psicología</option>
            <option value="Metodología">Asesoría Metodológica</option>
            <option value="Plan Integral">Plan Integral</option>
            <option value="Otro">Otro</option>
          </select>
          
          <textarea 
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            placeholder="Escribe tu consulta aquí..." 
            className="form-control mb-3"
            rows="3"
            required
          ></textarea>
          
          <button 
            type="submit" 
            className="btn-solicitar-info"
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'loading' ? 'Enviando...' : (
               <>Enviar <FaPaperPlane className="icon-send" /></>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;