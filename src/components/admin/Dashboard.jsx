import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

export default function Dashboard({ adminLogin, setInfoDetails, getCookie, setAdminLogin }) {

    useEffect(() => {
        if (!adminLogin)
            setInfoDetails({
                "to": "/admin/login",
                "message": "You need to login to access Dashboard. Heading to Login Page now",
                "linkText": "Login"
            })
        setAdminLogin(getCookie("loggedIn") ? true : false)
        console.log("Logged in? from dashboard: " + adminLogin)
    })

    return (
        <div>
            <h1>Dashboard</h1>
            {adminLogin ? "You've logged in" : "You havent logged in"}
            {!adminLogin && <Navigate to="/admin/info" />}
        </div>
    )
}
