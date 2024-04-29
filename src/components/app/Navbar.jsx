import React from 'react'
import { IoFastFood } from "react-icons/io5"; 
import { GiBiceps } from "react-icons/gi";
import { FaChartPie } from "react-icons/fa";

import '../css/Navbar.css'
import { NavLink } from 'react-router-dom';


export default function Navbar() {
    return (
        <nav className='app-nav'>
            <section>
                <NavLink to="/app/food" activeClassName="active-nav">
                    <IoFastFood />
                    <span>Food</span>
                </NavLink>
                <NavLink to="/app/exercise" activeClassName="active-nav">
                    <GiBiceps />
                    <span>Exercise</span>
                </NavLink>
                <NavLink to="/app" activeClassName="active-nav">
                    <FaChartPie />
                    <span>Dashboard</span>
                </NavLink>
            </section>
        </nav>
    )
}
