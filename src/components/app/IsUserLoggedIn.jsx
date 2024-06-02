import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCookie } from './Appli';

export default function IsUserLoggedIn({ userLoggedIn, children }) {

    const navigate = useNavigate();

    useEffect(() => {
        if (!getCookie("userLoggedIn")) navigate("/app/login")
        // eslint-disable-next-line
    }, [])


    return (
        <>{children}</>
    )
}
