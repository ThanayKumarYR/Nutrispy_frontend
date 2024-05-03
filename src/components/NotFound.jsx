import React from 'react'
import "../App.css";
import { Link, NavLink } from 'react-router-dom';

import Logo from "../images/logo.png"
import './css/NotFound.css'

export default function NotFound() {
    return (
        <section className='not-found'>
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
            <main>
                <center>Came here by mistake? Head out to <Link to="/">main page</Link></center>
            </main>
        </section>
    )
}
