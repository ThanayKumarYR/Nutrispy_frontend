import React from 'react'
import { NavLink } from 'react-router-dom';

import '../css/Navbar.css'

import { IoFastFood } from "react-icons/io5"; 
import { FaChartPie } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";


export default function Navbar() {
    return (
        <nav className='app-nav'>
            <section>
                <NavLink to="/app/diet" className={({isActive}) => (isActive ? "active-nav" : "")}>
                    <IoFastFood />
                    <span>Diet</span>
                </NavLink>
                <NavLink to="/app/chat" className={({isActive}) => (isActive ? "active-nav" : "")}>
                    <RiRobot2Fill />
                    <span>Chat</span>
                </NavLink>
                <NavLink to="/app/dashboard" className={({isActive}) => (isActive ? "active-nav" : "")}>
                    <FaChartPie />
                    <span>Dashboard</span>
                </NavLink>
            </section>
        </nav>
    )
}
