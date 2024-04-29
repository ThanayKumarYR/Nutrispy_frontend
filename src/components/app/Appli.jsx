import React from 'react'
import Navbar from './Navbar'
import { Route, Routes } from 'react-router-dom'
import Dashborard from './Dashborard'
import Food from './Food'
import Exercise from './Exercise'

export default function Appli() {
    return (
        <main className='app'>
            <Routes>
                <Route path="/food" element={<Food />} />
                <Route path="/exercise" element={<Exercise />} />
                <Route path="/" element={<Dashborard />} />
            </Routes>
            <Navbar />
        </main>
    )
}
