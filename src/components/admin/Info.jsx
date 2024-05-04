import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Info({ to, message, linkText }) {

    const navigate = useNavigate()
    useEffect(() => {
        console.log("Navigating from Info page");
        setTimeout(() => {
            navigate(to);
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
