import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { customAxios } from '../../utilities'

import { Alert, Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import LoginIcon from '@mui/icons-material/Login';
import { Visibility, VisibilityOff } from '@mui/icons-material'

import './css/Login.css'
import { setSession } from '../../utilities/session'

export default function Login({ adminLogin, setInfoDetails, setAdminLogin, setCookie, getCookie }) {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [userPass, setUserPass] = useState("")
    const [loading, setLoading] = useState(false)
    const [formResponse, setFormResponse] = useState({})

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }

    function handleLogin(e) {
        e.preventDefault();
        setLoading(true)
        customAxios.posting('/login', {
            "email": email.trim(),
            "password": userPass
        })
            .then((response) => {
                setFormResponse(response.data)
                setLoading(false)
                if (response.data.response.toLowerCase().includes("success")) {
                    if(response.data.data.userType === 'admin'){
                        setSession("admin")
                        console.log('Succesfully logged in as admin, going to dashboard in 5 sec');
                        setTimeout(() => {
                            setAdminLogin(true)
                            navigate("/admin");
                        }, 2000)
                    }
                    else{
                        setSession("user")
                        console.log('Succesfully logged in as user, going to dashboard in 5 sec');
                        setTimeout(() => {
                            setAdminLogin(true)
                            navigate("/app/dashboard");
                        }, 2000)
                    }
                    setCookie("loggedIn=true")
                    console.log(getCookie("loggedIn"))
                }
            })
            .catch(error => {
                console.error(error);
                setLoading(false)
            })

    }

    useEffect(() => {
        setAdminLogin(getCookie("loggedIn") ? true : false)
        // console.log("Logged in? from login: " + adminLogin)
        if (adminLogin)
            setInfoDetails({
                "to": "/admin",
                "message": "You have already logged in. Heading to Dashboard now",
                "linkText": "Dashboard"
            })
        // eslint-disable-next-line
    }, [])

    return (
        <section className='login-page'>
            <Box className='login-form' component="form" onSubmit={handleLogin}>
                <h1 className='login-title'>Admin Login</h1>
                {!loading && formResponse.response &&
                    <Alert variant="filled" severity={formResponse.response.toLowerCase().includes("success") ? "success" : "error"} sx={{ mb: 2 }}>
                        {formResponse.response.toLowerCase().includes("success") ? "Successfully Logged In" : formResponse.data}
                    </Alert>}
                <TextField
                    sx={{ my: 1 }}
                    required
                    fullWidth
                    autoFocus
                    margin="dense"
                    name="email"
                    label="Email"
                    type="text"
                    value={email}
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormControl sx={{ my: 1 }} variant="outlined" required fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        required
                        margin="dense"
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        value={userPass}
                        onChange={(e) => setUserPass(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <LoadingButton
                    className='login-sbt-btn'
                    sx={{ p: 1.4, mt: 2 }}
                    fullWidth
                    loading={loading}
                    loadingPosition="end"
                    endIcon={<LoginIcon />}
                    variant="contained"
                    type="submit"
                >
                    Log In
                </LoadingButton>
            </Box>

            {adminLogin && <Navigate to="/admin/info" />}
        </section >
    )
}
