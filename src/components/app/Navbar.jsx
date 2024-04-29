import React from 'react'
import { NavLink } from 'react-router-dom';

import '../css/Navbar.css'

import { IoFastFood } from "react-icons/io5"; 
import { GiBiceps } from "react-icons/gi";
import { FaChartPie } from "react-icons/fa";



export default function Navbar() {
    return (
        <nav className='app-nav'>
            <section>
                <NavLink to="/app/food" className={({isActive}) => (isActive ? "active-nav" : "")}>
                    <IoFastFood />
                    <span>Food</span>
                </NavLink>
                <NavLink to="/app/exercise" className={({isActive}) => (isActive ? "active-nav" : "")}>
                    <GiBiceps />
                    <span>Exercise</span>
                </NavLink>
                <NavLink to="/app/dashboard" className={({isActive}) => (isActive ? "active-nav" : "")}>
                    <FaChartPie />
                    <span>Dashboard</span>
                </NavLink>
            </section>
        </nav>
    )
}
