import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { customAxios } from '../../utilities'

import { Alert, Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import LoginIcon from '@mui/icons-material/Login';
import { NavigateNext, Visibility, VisibilityOff } from '@mui/icons-material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './css/Signup.css'
import { setSession } from '../../utilities/session'


export default function SignUp({ setUserLoggedIn, setCookie, getCookie }) {

    const navigate = useNavigate()

    const [pageIndex, setPageIndex] = useState(1);

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        age: "",
        gender: "",
        weight: "",
        height: "",
        profession: "",
        location: "",
        diseases: [],
        foodGoal: "",
        exerciseGoal: "",
        userPass: "",
        userConfirmPass: ""
    })
    const [loading, setLoading] = useState(false)
    const [formResponse, setFormResponse] = useState({})

    function handleSignup(e) {
        e.preventDefault();
        setLoading(true)

        console.log(userData)
        if(true) return
        
        // customAxios.posting('/login', {
        customAxios.posting('/', {
            "email": userData.email.trim(),
            "password": userData.userPass
        })
            .then((response) => {
                setFormResponse(response.data)
                setLoading(false)
                if (response.data.response.toLowerCase().includes("success")) {
                    if (response.data.data.userType === 'admin') {
                        setTimeout(() => {
                            navigate("/admin")
                        }, 2000)
                        setSession("admin")
                        console.log('Succesfully logged in as admin, going to dashboard in 5 sec');
                        setCookie("loggedIn=true")
                        console.log(getCookie("loggedIn"))
                    }
                    else {
                        setSession("user")
                        console.log('Succesfully logged in as user, going to dashboard in 5 sec');
                        setCookie("userLoggedIn=true")
                        console.log(getCookie("userLoggedIn"))
                        // setTimeout(() => {
                        setUserLoggedIn(true)
                        navigate("/app/dashboard")
                        // }, 2000)
                    }
                }
            })
            .catch(error => {
                console.error(error);
                setFormResponse({
                    data: error.message,
                    response: "error"
                })
                setTimeout(() => {
                    setFormResponse({})
                }, 5000)
                setLoading(false)
            })
    }

    useEffect(() => {
        setUserLoggedIn(getCookie("userLoggedIn") ? true : false)
        // if (getCookie("userLoggedIn"))
        //     navigate("/app/dashboard")
        // eslint-disable-next-line
    }, [])


    return (
        <section className='signup-page'>
            {pageIndex === 1
                ?
                <SignUp1 userData={userData} setUserData={setUserData} pageIndex={pageIndex} setPageIndex={setPageIndex} />
                :
                <SignUp2
                    userData={userData}
                    setUserData={setUserData}
                    formResponse={formResponse}
                    handleSignup={handleSignup}
                    loading={loading}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                />}
        </section >
    )
}


function SignUp1({ userData, setUserData, pageIndex, setPageIndex }) {

    const [showPassword, setShowPassword] = React.useState([false, false]);

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }

    return (
        <Box>
            <Box className='signup-form'>
                <h1 className='signup-title'>Create an account</h1>

                <TextField
                    sx={{ my: 1 }}
                    required
                    fullWidth
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Name"
                    type="text"
                    value={userData.name}
                    autoComplete="name"
                    onChange={(e) => setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                />
                <TextField
                    sx={{ my: 1 }}
                    required
                    fullWidth
                    margin="dense"
                    name="email"
                    label="Email"
                    type="text"
                    value={userData.email}
                    autoComplete="email"
                    onChange={(e) => setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                />
                <FormControl sx={{ my: 1 }} variant="outlined" required fullWidth>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput
                        required
                        margin="dense"
                        name="userPass"
                        label="Password"
                        type={showPassword[0] ? 'text' : 'password'}
                        autoComplete="current-password"
                        value={userData.userPass}
                        onChange={(e) => setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(prev => [!prev[0], false])}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword[0] ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {Boolean(userData.userConfirmPass && !(userData.userPass === userData.userConfirmPass))}
                <FormControl sx={{ my: 1 }} variant="outlined" required fullWidth >
                    <InputLabel >Confirm Password</InputLabel>
                    <OutlinedInput
                        error={Boolean(userData.userConfirmPass && !(userData.userPass === userData.userConfirmPass))}
                        color={!userData.userConfirmPass ? "" : !(userData.userPass === userData.userConfirmPass) ? "error" : "success"}
                        required
                        margin="dense"
                        name="userConfirmPass"
                        label="Confirm Password"
                        type={showPassword[1] ? 'text' : 'password'}
                        autoComplete="current-password"
                        value={userData.userConfirmPass}
                        onChange={(e) => setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(prev => [false, !prev[1]])}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword[1] ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {userData.userConfirmPass && !(userData.userPass === userData.userConfirmPass) && <Typography variant="caption" display="block" gutterBottom color="error">
                    Passwords do not match!
                </Typography>}
            </Box>
            <Button
                className='signup-sbt-btn'
                sx={{ p: 1.4, mt: 1 }}
                fullWidth
                endIcon={<NavigateNext />}
                variant="contained"
                type="button"
                onClick={() => { setPageIndex(2) }}
            >
                Next
            </Button>
        </Box >
    )
}
function SignUp2({ userData, setUserData, formResponse, handleSignup, loading, setPageIndex }) {

    return (
        <Box component="form" onSubmit={handleSignup}>
            {!loading && formResponse.response &&
                <Alert variant="filled" severity={formResponse.response.toLowerCase().includes("success") ? "success" : "error"} sx={{ mb: 2 }}>
                    {formResponse.response.toLowerCase().includes("success") ? "Successfully Logged In" : formResponse.data}
                </Alert>}
            <TextField
                sx={{ my: 1 }}
                fullWidth
                margin="dense"
                name="age"
                label="Age"
                type="number"
                value={userData.age}
                autoComplete="age"
                inputProps={{ min: 1, max: 100 }}
                onChange={(e) => setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            />
            <FormControl sx={{ my: 1 }} variant="outlined" fullWidth >
                <InputLabel>Gender</InputLabel>
                <Select
                    value={userData.gender}
                    label="Gender"
                    onChange={(e) => setUserData(prev => ({ ...prev, "gender": e.target.value }))}
                    fullWidth
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Rather not say">Rather not say</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ my: 1 }} variant="outlined" required fullWidth >
                <InputLabel >Weight</InputLabel>
                <OutlinedInput
                    required
                    margin="dense"
                    name="weight"
                    label="Weight"
                    type="number"
                    inputProps={{ min: 1, max: 100 }}
                    autoComplete="weight"
                    value={userData.weight}
                    onChange={(e) => setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                    endAdornment={
                        <InputAdornment position="end">
                            <Typography variant="body1" display="block" gutterBottom>
                                kg
                            </Typography>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl sx={{ my: 1 }} variant="outlined" required fullWidth >
                <InputLabel >Height</InputLabel>
                <OutlinedInput
                    required
                    margin="dense"
                    name="height"
                    label="Height"
                    type="number"
                    inputProps={{ min: 1, max: 100 }}
                    autoComplete="height"
                    value={userData.height}
                    onChange={(e) => setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                    endAdornment={
                        <InputAdornment position="end">
                            <Typography variant="body1" display="block" gutterBottom>
                                cm
                            </Typography>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <TextField
                sx={{ my: 1 }}
                fullWidth
                margin="dense"
                name="profession"
                label="Profession"
                type="text"
                value={userData.profession}
                autoComplete="profession"
                onChange={(e) => setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            />
            <TextField
                sx={{ my: 1 }}
                fullWidth
                margin="dense"
                name="location"
                label="Location"
                type="text"
                value={userData.location}
                autoComplete="profession"
                onChange={(e) => setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            />
            <FormControl sx={{ my: 1 }} variant="outlined" required fullWidth >
                <InputLabel htmlFor="hello">Weekly Calorie Intake Goal</InputLabel>
                <OutlinedInput
                    id="hello"
                    required
                    margin="dense"
                    name="foodGoal"
                    label="Weekly Calorie Intake Goal"
                    type="number"
                    inputProps={{ min: 1, max: 100 }}
                    autoComplete="weight"
                    value={userData.foodGoal}
                    onChange={(e) => setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                    endAdornment={
                        <InputAdornment position="end">
                            <Typography variant="body1" display="block" gutterBottom>
                                cal
                            </Typography>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl sx={{ my: 1 }} variant="outlined" required fullWidth >
                <InputLabel htmlFor="hello">Weekly Calorie Burn Goal</InputLabel>
                <OutlinedInput
                    id="hello"
                    required
                    margin="dense"
                    name="exerciseGoal"
                    label="Weekly Calorie Burn Goal"
                    type="number"
                    inputProps={{ min: 1, max: 100 }}
                    autoComplete="weight"
                    value={userData.exerciseGoal}
                    onChange={(e) => setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                    endAdornment={
                        <InputAdornment position="end">
                            <Typography variant="body1" display="block" gutterBottom>
                                cal
                            </Typography>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <Button
                sx={{
                    color: (theme) => theme.palette.primary.dark,
                }}
                startIcon={< ArrowBackIcon />}
                onClick={() => setPageIndex(1)}
            >
                Back
            </Button>
            <LoadingButton
                className='signup-sbt-btn'
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
        </Box >
    )
}