import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from "../../images/logo.png"
import './css/AdminNav.css'

export default function AdminNav() {
    return (
        <section className='admin-nav'>
            <nav className="admin-navbar">
                <div className="logo-div">
                    <NavLink to="/" className="logo">
                        <img src={Logo} alt="Nutrispy Logo" />
                        <p>NutriSpy</p>
                    </NavLink>
                </div>
                {/* <div className="try-app">
                    <NavLink to="app/dashboard">Try App</NavLink>
                </div> */}
            </nav>
        </section>
    )
}
