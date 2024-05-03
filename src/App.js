import "./App.css";
import React from 'react';
import { NavLink } from 'react-router-dom';
import { About, Contact, Home, Products, Services } from "./pages"
import { ScrollUpButton } from "./components";

import Logo from "./images/logo.png"

function App() {
    return (
        <div className="App">
            <nav className="navbar">
                <div className="logo-div">
                    <NavLink to="/" className="logo">
                        <img src={Logo} alt="Nutrispy Logo" />
                        <p>NutriSpy</p>
                    </NavLink>
                </div>
                <div className="try-app">
                    <NavLink to="app/dashboard">Try App</NavLink>
                </div>
            </nav>
            <Home />
            <About />
            <Services />
            <Products />
            <Contact />
            <ScrollUpButton />
        </div >
    );
}

export default App;
