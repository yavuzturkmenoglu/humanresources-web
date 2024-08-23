import { Container, Nav, Navbar } from "react-bootstrap";
import { IoPersonOutline } from "react-icons/io5";

export default function Header() {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className="mb-2">
      <Container>
        <Navbar.Brand>
          <IoPersonOutline />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link>Ana Sayfa</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
