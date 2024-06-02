import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { Link, NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Dashborard from './Dashborard'
import Diet from './Diet'
import Chat from './Chat'
import Login from './Login'
import IsUserLoggedIn from './IsUserLoggedIn'

import Logo from "../../images/logo.png"
import { customAxios } from '../../utilities'
import Profile from './Profile'

export default function Appli() {

    const [userLoggedIn, setUserLoggedIn] = useState(false)

    // eslint-disable-next-line
    const [data, setData] = useState([])
    const navigate = useNavigate()

    // eslint-disable-next-line
    const [userPoints, setUserPoints] = useState({
        "goalScore": 4000,
        "currentScore": 3400
    })

    // const foodScore = 100 * userPoints.currentScore / userPoints.goalScore;

    useEffect(() => {
        setUserLoggedIn(getCookie("userLoggedIn") ? true : false)

        if (!getCookie("userLoggedIn")) {
            // navigate("/app/login")
            console.log(getCookie("userLoggedIn"))
        }
        getSession()
        // eslint-disable-next-line
    }, [])

    function getSession() {
        customAxios.getting("/check_session", undefined)
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                setData(error.data)
            })
    }

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

    function logout(setLoading) {
        setLoading(true)
        customAxios.getting("/logout", undefined)
            .then(response => {
                console.log(response.data)
                if (response.data.response.toLowerCase().includes('success')) {
                    setUserLoggedIn(false)
                    localStorage.removeItem('session');
                    deleteCookie('userLoggedIn')
                    console.log("Successfully logged out")
                    navigate("/app/login")
                } else {
                    alert(JSON.stringify(response.data))
                }
            })
            .catch(error => console.error(error))
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <main>
            {!userLoggedIn &&
                <nav className="navbar">
                    <div className="logo-div">
                        <NavLink to="/" className="logo">
                            <img src={Logo} alt="Nutrispy Logo" />
                            <p>NutriSpy</p>
                        </NavLink>
                    </div>
                    <div className="try-app">
                        <NavLink to="/app/login">Try App</NavLink>
                    </div>
                </nav>
            }
            <Routes>
                <Route path="/diet/*" element={<IsUserLoggedIn userLoggedIn={userLoggedIn}><Diet userPoints={userPoints} /></IsUserLoggedIn>} />
                <Route path="/chat/*" element={<IsUserLoggedIn userLoggedIn={userLoggedIn}><Chat /></IsUserLoggedIn>} />
                <Route path="/dashboard/*" element={<IsUserLoggedIn userLoggedIn={userLoggedIn}><Dashborard userPoints={userPoints} logout={logout} /></IsUserLoggedIn>} />
                <Route path="/profile" element={<IsUserLoggedIn userLoggedIn={userLoggedIn}><Profile userPoints={userPoints} logout={logout} /></IsUserLoggedIn>} />
                <Route path="/" exact element={<Navigate to="/app/dashboard" />} />
                <Route path="/*" exact element={<>Uh oh! Not found page. Head to {userLoggedIn ? <Link to="/app/dashboard"><b>Dashboard page</b></Link> : <Link to="/app/login"><b>Login page</b></Link>} page</>} />
                <Route path="/login" element={<Login userLoogedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} setCookie={setCookie} getCookie={getCookie} />} />
            </Routes>
            {userLoggedIn &&
                <Navbar logout={logout}/>
            }
        </main>
    )
}

export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}