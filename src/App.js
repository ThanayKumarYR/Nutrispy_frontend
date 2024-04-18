// App.js
import "./App.css";
import React, { useState } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import { Home, About, Services, Products, Contact } from "./pages"
import { ScrollUpButton } from "./components";

import Logo from "./images/logo.png"

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div>
      <nav className="navbar">
        <div className="waste"></div>
        <div className="logo-div">
          <NavLink to="/" className="logo">
            <img src={Logo} alt="Nutrispy Logo" />
            <p>NutriSpy</p>
          </NavLink>
        </div>
        <div className="navbar-toggle" onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        </div>
        <ul className={`navbar-nav ${isMenuOpen ? 'open' : ''}`}>
          <li className="nav-item">
            <NavLink to="/" activeClassName="active" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/services" className="nav-link" onClick={() => setIsMenuOpen(false)}>Services</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/products" className="nav-link" onClick={() => setIsMenuOpen(false)}>Products</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="about" exact element={<About />} />
        <Route path="services" exact element={<Services />} />
        <Route path="products" exact element={<Products />} />
        <Route path="contact" exact element={<Contact />} />
        <Route path="/" exact element={<Home />} />
      </Routes>
      <ScrollUpButton />
    </div>
  );
}

export default App;
