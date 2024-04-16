// App.js
import "./App.css";
import React,{ useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import{Home,About,Services,Products,Contact} from "./pages"
import { ScrollUpButton } from "./components";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
      <div>
        <nav className="navbar">
          <div className="navbar-toggle" onClick={toggleMenu}>
            <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          </div>
          <ul className={`navbar-nav ${isMenuOpen ? 'open' : ''}`}>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</Link>
            </li>
            <li className="nav-item">
              <Link to="/services" className="nav-link" onClick={() => setIsMenuOpen(false)}>Services</Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link" onClick={() => setIsMenuOpen(false)}>Products</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/about" exact element={<About />}/>
          <Route path="/services" exact element={<Services />}/>
          <Route path="/products" exact element={<Products />}/>
          <Route path="/contact" exact element={<Contact/>}/>
        </Routes>
        <ScrollUpButton />
      </div>
  );
}

export default App;
