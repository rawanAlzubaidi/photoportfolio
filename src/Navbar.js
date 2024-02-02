import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png'; // Make sure the path to your logo is correct

const MyNavbar = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="rounded-navbar">
     <Navbar.Brand as={Link} to="/" className="align-items-center d-flex">
        <div className="logo-circle"> 
          <img src={logo} height="50" alt="Logo" />
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ color: 'white' }} />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link as={Link} to="/digital" className="navbar-text">Digital</Nav.Link>
          <Nav.Link as={Link} to="/Film" className="navbar-text">Film</Nav.Link>
          <Nav.Link as={Link} to="/doors" className="navbar-text">Doors</Nav.Link>
          <Nav.Link as={Link} to="/aboutme" className="navbar-text btn btn-outline-light rounded-btn">About</Nav.Link>
        </Nav>

      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
