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
  const [isExpanded, setIsExpanded] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    servicio_interes: '',
    mensaje: ''
  });

  // Nuevo estado para errores de validación
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); 

  // --- FUNCION DE VALIDACIÓN ---
  const validateField = (name, value) => {
    let errorMsg = '';

    if (name === 'nombre') {
      // Regex: Solo letras (incluye tildes y ñ) y espacios. No números ni símbolos.
      const nombreRegex = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/;
      if (!value.trim()) {
        errorMsg = 'El nombre es obligatorio.';
      } else if (!nombreRegex.test(value)) {
        errorMsg = 'El nombre no puede contener números ni caracteres especiales.';
      }
    }

    if (name === 'email') {
      // Regex estándar para email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        errorMsg = 'El correo es obligatorio.';
      } else if (!emailRegex.test(value)) {
        errorMsg = 'Por favor, ingresa un correo válido (ej: nombre@gmail.com).';
      }
    }

    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Actualizamos el dato
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Validamos en tiempo real (opcional: limpia el error si el usuario corrige)
    const error = validateField(name, value);
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error // Si no hay error, se guarda string vacío
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar todo antes de enviar
    const nombreError = validateField('nombre', formData.nombre);
    const emailError = validateField('email', formData.email);
    
    // Si hay errores, los mostramos y NO enviamos
    if (nombreError || emailError) {
      setErrors({
        nombre: nombreError,
        email: emailError
      });
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ nombre: '', email: '', servicio_interes: '', mensaje: '' });
        setTimeout(() => {
            setStatus('idle');
            setIsExpanded(false);
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus('error');
    }
  };

  return (
    <div className={`contact-form-card ${isExpanded ? 'expanded' : ''}`}>
      
      <div className="card-header-content">
        <div className="header-text">
          <h3>¿Listo para empezar?</h3>
          {!isExpanded && <p className="card-description">Déjanos tus datos y te contactaremos.</p>}
        </div>
        {isExpanded && (
          <button className="btn-close-form" onClick={() => setIsExpanded(false)}>
            <FaTimes />
          </button>
        )}
      </div>

      {!isExpanded ? (
        <div className="cta-container">
          <button className="btn-expand-form" onClick={() => setIsExpanded(true)}>
            <FaCommentDots className="icon-btn" /> Escribir Consulta
          </button>
        </div>
      ) : (
        <form className="form-content fade-in" onSubmit={handleSubmit}>
          
          {status === 'success' && (
            <div className="alert alert-success">
              <FaCheckCircle /> ¡Mensaje enviado con éxito!
            </div>
          )}
          {status === 'error' && (
            <div className="alert alert-error">
              <FaExclamationCircle /> Hubo un error. Intenta nuevamente.
            </div>
          )}

          {/* Input Nombre con Error */}
          <div className="form-group">
            <input 
              type="text" 
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu Nombre" 
              className={`form-control ${errors.nombre ? 'input-error' : ''}`}
            />
            {errors.nombre && <span className="error-text">{errors.nombre}</span>}
          </div>

          {/* Input Email con Error */}
          <div className="form-group">
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Tu Email" 
              className={`form-control ${errors.email ? 'input-error' : ''}`}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          {/* SELECT MEJORADO (Más intuitivo) */}
          <div className="form-group">
            <select 
              name="servicio_interes"
              value={formData.servicio_interes}
              onChange={handleChange}
              className="form-control select-pointer" // Clase nueva
              required
            >
              <option value="" disabled>👇 Selecciona un servicio aquí</option>
              <option value="Psicología">Psicología</option>
              <option value="Metodología">Asesoría Metodológica</option>
              <option value="Plan Integral">Plan Integral</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          
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