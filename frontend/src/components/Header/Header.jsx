import { Button, Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar sticky="top" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Impulsamente
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            <Nav.Link as={Link} to="/"> 
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/servicios">
              Servicios
            </Nav.Link>
            <Nav.Link as={Link} to="/nosotros">
              Nosotros
            </Nav.Link>
            <Nav.Link as={Link} to="/contacto">
              Contactanos
            </Nav.Link>

            <Button
              variant="primary"
              as={Link}
              to="/agendar"
              className="ms-lg-2">
              Agendar
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
