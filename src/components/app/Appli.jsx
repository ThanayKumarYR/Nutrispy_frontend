import React from 'react'
import Navbar from './Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashborard from './Dashborard'
import Diet from './Diet'
import Chat from './Chat'

export default function Appli() {
    return (
        <main>
            <Routes>
                <Route path="/diet/*" element={<Diet />} />
                <Route path="/chat/*" element={<Chat />} />
                <Route path="/dashboard/*" element={<Dashborard />} />
                <Route path="/" element={<Navigate to="/app/dashboard" />} />
            </Routes>
            <Navbar />
        </main>
    )
}
