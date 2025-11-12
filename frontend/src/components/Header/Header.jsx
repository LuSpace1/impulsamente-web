// 1. IMPORTA LAS HERRAMIENTAS ADICIONALES
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import { Link as RouterLink, useNavigate } from "react-router-dom"; // Importa useNavigate
import { Link as ScrollLink, animateScroll } from "react-scroll"; // Importa animateScroll

function Header() {

  const navigate = useNavigate();

  const handleInicioClick = () => {

    navigate('/'); 
    
    animateScroll.scrollToTop({
      duration: 500, // Duración de la animación en ms
      smooth: "easeInOutQuad", // Tipo de animación
    });

  };

  return (
    <Navbar sticky="top" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={handleInicioClick} style={{ cursor: "pointer" }}>
          Impulsamente
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={handleInicioClick}>Inicio</Nav.Link>

            <Nav.Link
              as={ScrollLink}
              to="seccion-servicios"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              style={{ cursor: "pointer" }}
            >
              Servicios
            </Nav.Link>

            <Nav.Link
              as={ScrollLink}
              to="seccion-nosotros"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              style={{ cursor: "pointer" }}
            >
              Nosotros
            </Nav.Link>

            <Nav.Link
              as={ScrollLink}
              to="seccion-contacto"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              style={{ cursor: "pointer" }}
            >
              contacto
            </Nav.Link>

            <Button
              variant="primary"
              as={RouterLink}
              to="/agendar"
              className="ms-lg-2"
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