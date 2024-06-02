import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import Dashboard from './Dashboard'
import Login from './Login'
import Info from './Info'
import AdminNav from './AdminNav'
import Contacts from './Contacts'

export default function Admin() {

    const [adminLogin, setAdminLogin] = useState(false)
    const [infoDetails, setInfoDetails] = useState({
        "to": "/admin/login",
        "message": "We really dont know how you came here. Anyway, just login to see what we have. Heading to login page now ",
        "loginText": "Login"
    })

    const navigate = useNavigate()

    useEffect(() => {
        setAdminLogin(getCookie("loggedIn") ? true : false)
        // console.log("Logged in? from admin: " + adminLogin)

        if (!getCookie("loggedIn")) {
            navigate("/admin/login")
        }
        // eslint-disable-next-line
    }, [])

    function setCookie(parameter) {
        var now = new Date();

        now.setDate(now.getDate() + 1);

        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        var updatedTime = now.toLocaleString('en-US', options);
        console.log("setting cookie")

        document.cookie = `${parameter}; ${updatedTime}; path="/"`
    }

    function deleteCookie(parameter) {
        document.cookie = `${parameter}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        console.log("deleting a cookie")
    }

    function getCookie(name) {
        // console.log("getting cookie of " + name);
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    return (
        <section className='admin'>
            <AdminNav adminLogin={adminLogin} setAdminLogin={setAdminLogin} deleteCookie={deleteCookie} setInfoDetails={setInfoDetails} getCookie={getCookie} />
            <Routes>
                <Route path="/login" element={<Login adminLogin={adminLogin} setAdminLogin={setAdminLogin} setInfoDetails={setInfoDetails} setCookie={setCookie} getCookie={getCookie} />} />
                <Route path="/info" element={<Info {...infoDetails} setInfoDetails={setInfoDetails} adminLogin={adminLogin} />} />
                <Route path="/contacts" element={< Contacts adminLogin={adminLogin} setInfoDetails={setInfoDetails} setAdminLogin={setAdminLogin} getCookie={getCookie} />} />
                <Route path="/" element={< Dashboard adminLogin={adminLogin} setInfoDetails={setInfoDetails} setAdminLogin={setAdminLogin} getCookie={getCookie} />} />
                <Route path="/*" element={<Navigate to="/admin" replace={true} />} />
            </Routes>
        </section>
    )
}
