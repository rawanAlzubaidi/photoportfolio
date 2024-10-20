import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './assets/logo.png'; 
import './Navbar.css'; // Add this import for custom styles

const MyNavbar = () => {
  return (
    <Navbar expand="lg" bg="light" variant="light" className="rounded-navbar sticky-navbar">
      <Navbar.Brand as={Link} to="/" className="align-items-center d-flex">
        <div className="logo-circle"> 
          <img src={logo} alt="Logo" />
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-column mx-auto">
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
