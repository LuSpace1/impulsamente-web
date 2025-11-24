import { Button, Navbar, Nav, Container } from "react-bootstrap";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { scroller, animateScroll } from "react-scroll";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavegacion = (seccionDestino) => {
    if (seccionDestino === "inicio") {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          animateScroll.scrollToTop({ duration: 250, smooth: "easeInOutQuad" });
        }, 100);
      } else {
        animateScroll.scrollToTop({ duration: 250, smooth: "easeInOutQuad" });
      }
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scroller.scrollTo(seccionDestino, {
          duration: 250,
          smooth: true,
          offset: -70, 
        });
      }, 100);
    } else {
      scroller.scrollTo(seccionDestino, {
        duration: 250,
        smooth: true,
        offset: -70,
      });
    }
  };

  return (
    <Navbar sticky="top" expand="lg" className="navbar-personalizado">
      <Container fluid>
        <Navbar.Brand
          onClick={() => handleNavegacion("inicio")}
          className="logo-brand"
          style={{ cursor: "pointer" }}
        >
          <img src="/LogoImpulsamente.svg" alt="Logo" className="logo-icon" />
          <span className="logo-text">
            Impulsa<span>Mente</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link onClick={() => handleNavegacion("inicio")}>
              Inicio
            </Nav.Link>

            <Nav.Link onClick={() => handleNavegacion("seccion-servicios")}>
              Servicios
            </Nav.Link>

            <Nav.Link onClick={() => handleNavegacion("seccion-nosotros")}>
              Nosotros
            </Nav.Link>

            <Nav.Link onClick={() => handleNavegacion("seccion-FAQ")}>
              FAQ
            </Nav.Link>

            <Nav.Link onClick={() => handleNavegacion("footer-section")}>
              Contáctanos
            </Nav.Link>

            <Button
              onClick={() => handleNavegacion("seccion-servicios")}
              className="btn-agendar-cita"
            >
              Agendar
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;