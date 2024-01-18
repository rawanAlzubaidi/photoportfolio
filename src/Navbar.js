// MyNavbar.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png'; // Make sure the path to your logo is correct

const MyNavbar = () => {
  return (
    <Navbar expand="lg" sticky="top" className="text-center">
      <Navbar.Brand as={Link} to="/" className="w-100"> {/* Logo navigates to the root */}
        <img src={logo} height="80" className="mx-auto d-block" alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link as={Link} to="/doors">Doors</Nav.Link>
          <Nav.Link as={Link} to="/Digital">Digital</Nav.Link>
          <Nav.Link as={Link} to="/Film">Film</Nav.Link>
          {/* Other links can go here */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
