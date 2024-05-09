import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function IsUserLoggedIn({ userLoggedIn, children }) {

    const navigate = useNavigate();

    useEffect(() => {
        if (!userLoggedIn) navigate("/app/login")
        // eslint-disable-next-line
    }, [])


    return (
        <>{children}</>
    )
}
