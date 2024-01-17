import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png'; // Make sure the path to your logo is correct

const MyNavbar = () => {
  return (
    <Navbar  expand="lg" sticky="top" className="text-center">
      <Navbar.Brand href="#home" className="w-100">
        <img
          src={logo}
          height="80" // Set the height you want for your logo
          className="mx-auto d-block" // Center the logo
          alt="Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
        <Nav.Link href="https://kitabat.vercel.app/">kitabat</Nav.Link>
          <Nav.Link href="#pictures">Pictures</Nav.Link>
          <Nav.Link href="https://www.youtube.com/playlist?list=PLZswni9Vqi6kkxGei9INCFCebzIgxdrFB">Videos</Nav.Link>
         
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
