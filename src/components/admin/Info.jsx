import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Info({ to, message, linkText, setInfoDetails, adminLogin }) {

    const navigate = useNavigate()
    useEffect(() => {
        // console.log("Navigating from Info page");
        setTimeout(() => {
            navigate(to);
            if (!adminLogin) {
                setInfoDetails({
                    "to": "/admin/login",
                    "message": "We really dont know how you came here. Anyways, just login to see what we have. Heading to login page now ",
                    "loginText": "Login"
                })
            } else {
                setInfoDetails({
                    "to": "/admin",
                    "message": "We really dont know how you came here. Since you have already logged in, heading to dashboard now ",
                    "loginText": "Dashboard"
                })
            }
        }, 5000)
    })

    return (
        <div>
            <h1>Info</h1>
            {JSON.stringify(to)}
            <br />
            <p>{message} <Link to={to}>{linkText}</Link></p>
        </div>
    )
}
