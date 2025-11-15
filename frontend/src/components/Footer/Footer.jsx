import "./Footer.css";

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-container">
      <p className="footer-title">Impulsa<span>Mente</span></p>
      <p className="footer-copy">Acompañamos tu tesis con enfoque humano y metodológico.</p>
      <p className="footer-small">© {new Date().getFullYear()} ImpulsaMente. Todos los derechos reservados.</p>
    </div>
  </footer>
);

export default Footer;
