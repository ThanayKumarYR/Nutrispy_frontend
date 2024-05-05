import React, { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

import Logo from "../../images/logo.png"

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Logout from '@mui/icons-material/Logout';

import './css/AdminNav.css'

export default function AdminNav({ adminLogin, setAdminLogin, getCookie, deleteCookie, setInfoDetails }) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleLogout() {
        handleClose();
        setAdminLogin(false)
        deleteCookie('loggedIn')
        setInfoDetails({
            "to": "/admin/login",
            "message": "You have successfully logipged out. Heading to Login Page now",
            "linkText": "Login Page"
        })
        navigate("/admin/info")
    }


    const navigate = useNavigate()

    useEffect(() => {
        setAdminLogin(getCookie("loggedIn") ? true : false)
        // console.log("Logged in? from admin nav: " + adminLogin)

        if (!getCookie("loggedIn")) {
            navigate("/admin/login")
        }
        // eslint-disable-next-line
    }, [useLocation().pathname])


    return (
        <section className='admin-nav'>
            <nav className="admin-navbar">
                <div className="logo-div">
                    <NavLink to="/" className="logo">
                        <img src={Logo} alt="Nutrispy Logo" />
                        <p>NutriSpy</p>
                    </NavLink>
                </div>
                {adminLogin &&
                    <div className="login-menu">
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <Tooltip title="Account">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 40, height: 40 }}>A</Avatar>
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 4,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    px: 1,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 20,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={handleClose}>
                                <Avatar /> Contacts
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Avatar /> My account
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                }
            </nav>
            <Link to="/admin">Admin</Link>
            <Link to="/admin/login">Login</Link>
            <Link to="/admin/info">Info</Link>
            <Link to="/admin/contacts">Contacts</Link>
        </section>
    )
}
