import React from 'react';
import './Footer.css';
import ContactForm from '../ContactForm/ContactForm';
// Importamos TODOS los íconos necesarios (Sociales + Contacto)
import { 
  FaInstagram, 
  FaFacebookF, 
  FaLinkedinIn, 
  FaWhatsapp,
  FaMapMarkerAlt, // Icono de Ubicación
  FaEnvelope,     // Icono de Email
  FaPhone         // Icono de Teléfono
} from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer id="contacto" className="footer-section">
      <div className="container">
        <div className="row footer-main-content">
          
          {/* Columna 1: ImpulsaMente */}
          <div className="col-lg-4 col-md-6 footer-col">
            <h3 className="footer-logo">ImpulsaMente</h3>
            <p className="footer-description">
              Transformamos el desafío de la tesis en una experiencia de crecimiento personal 
              y éxito académico. Estamos aquí para acompañarte en cada paso.
            </p>
            <div className="social-icons">
              <a href="https://www.instagram.com/impulsamente/" target="_blank" rel="noopener noreferrer" className="social-icon"><FaInstagram /></a>
              <a href="https://www.facebook.com/impulsamente/" target="_blank" rel="noopener noreferrer" className="social-icon"><FaFacebookF /></a>
              <a href="https://www.linkedin.com/company/impulsamente/" target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedinIn /></a>
              <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer" className="social-icon"><FaWhatsapp /></a>
            </div>
          </div>
          
          {/* Columna 2: Contacto Directo (CORREGIDA) */}
          <div className="col-lg-4 col-md-6 footer-col">
            <h3>Contacto Directo</h3>
            <ul className="contact-list">
              {/* Usamos los componentes de React Icons aquí */}
              <li>
                <FaMapMarkerAlt className="contact-icon" /> 
                Santiago, Chile (Atención Online)
              </li>
              <li>
                <FaEnvelope className="contact-icon" /> 
                hola@impulsamente.cl
              </li>
              <li>
                <FaPhone className="contact-icon" /> 
                +56 9 1234 5678
              </li>
            </ul>
          </div>
          
          {/* Columna 3: Formulario */}
          <div className="col-lg-4 col-md-12 footer-col">
            <ContactForm />
          </div>
          
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="row">
            <div className="col-md-6 copyright-col">
              <p className="copyright-text">
                © {new Date().getFullYear()} ImpulsaMente. Todos los derechos reservados.
              </p>
            </div>
            <div className="col-md-6 legal-links-col">
              <ul className="legal-links-list">
                <li><a href="#">Términos</a></li>
                <li><a href="#">Privacidad</a></li>
                <li>
                  {/* Apunta directamente a tu URL de Django Admin */}
                  <a 
                    href="http://127.0.0.1:8000/admin/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title="Acceso Administrativo" // Tooltip al pasar el mouse
                  >
                    Acceso Administrador
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;