import React from "react";
import { Link } from "react-router-dom";
import { Bitcoin } from "lucide-react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const BitRadexNav = () => {
  return (
    <Navbar expand="lg" className="py-2 border-bottom bg-dark">
      <Container>

        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Bitcoin className="h-6 w-6 text-bitradex-orange" />
          <span className="ms-2 fs-4 fw-bold text-light">BitRadex</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />

        <Navbar.Collapse id="main-nav text-light">
          <Nav className="ms-auto d-flex align-items-center gap-3">

            <Nav.Link as={Link} to="#features" className="nav-link-bitradex">
              Features
            </Nav.Link>

            <Nav.Link as={Link} to="#testimonials" className="nav-link-bitradex">
              Testimonials
            </Nav.Link>

            <Nav.Link as={Link} to="#pricing" className="nav-link-bitradex">
              Pricing
            </Nav.Link>

            <Nav.Link as={Link} to="/login" className="nav-link-bitradex">
              Login
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/signup"
              className="text-bitradex-orange fw-semibold nav-link-bitradex"
            >
              Sign Up
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BitRadexNav;
