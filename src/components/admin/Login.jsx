import { LoadingButton } from '@mui/lab'
import { Alert, Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


import './css/Login.css'

import LoginIcon from '@mui/icons-material/Login';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { axios } from '../../utilities'

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
        axios.posting('/login', {
            "email": email,
            "password": userPass
        })
            .then((response) => {
                setFormResponse(response.data)
                setLoading(false)
                console.log(response)
                if (response.data.response.toLowerCase().includes("failed")) {
                    console.log('Succesfully logged in, going to dashboard in 5 sec');
                    setCookie("loggedIn=true")
                    setTimeout(() => {
                        setAdminLogin(true)
                        navigate("/admin");
                    }, 5000)
                } 
            })
            .catch(error => {
                console.error(error);
                setLoading(false)
            })
    }

    useEffect(() => {
        if (adminLogin)
            setInfoDetails({
                "to": "/admin",
                "message": "You have already logged in. Heading to Dashboard now",
                "linkText": "Dashboard"
            })
        setAdminLogin(getCookie("loggedIn") ? true : false)
        console.log("Logged in? from login: "+adminLogin)
    })

    return (
        <section className='login-page'>
            <Box className='login-form' component="form" onSubmit={handleLogin}>
                <h1 className='login-title'>Login</h1>
                {!loading && formResponse.response &&
                    <Alert variant="filled" severity={formResponse.response.toLowerCase().includes("failed") ? "success" : "error"} sx={{ mb: 2 }}>
                        {formResponse.response.toLowerCase().includes("attribute") ? "Successfully Logged In" : formResponse.data}
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
