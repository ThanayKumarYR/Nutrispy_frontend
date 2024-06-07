import React from 'react'
import { Link, NavLink } from 'react-router-dom';

import '../css/Navbar.css'

import { IoFastFood } from "react-icons/io5";
import { RiRobot2Fill } from "react-icons/ri";
import { Avatar, Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import { FaRunning } from "react-icons/fa";

export default function Navbar({ logout }) {

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    return (
        <nav className='app-nav'>
            <section>
                <NavLink to="/app/diet" className={({ isActive }) => (isActive ? "active-nav" : "")}>
                    <IoFastFood />
                    <span>Diet</span>
                </NavLink>
                <NavLink to="/app/exercise" className={({ isActive }) => (isActive ? "active-nav" : "")}>
                    <FaRunning />
                    <span>Exercise</span>
                </NavLink>
                <NavLink to="/app/chat" className={({ isActive }) => (isActive ? "active-nav" : "")}>
                    <RiRobot2Fill />
                    <span>Chat</span>
                </NavLink>
                <Button
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <Avatar sx={{ width: 40, height: 40 }}>A</Avatar>
                </Button>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="top-start"
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                        sx={{ minWidth: "150px" }}
                                    >
                                        <MenuItem ><Link onClick={handleClose} sx={{ width: "100%", "border": "1px solid red" }} className='nav-link' to="/app/dashboard"> Dashboard</Link></MenuItem>
                                        <MenuItem ><Link onClick={handleClose} sx={{ width: "100%", "border": "1px solid red" }} className='nav-link' to="/app/profile"> Profile</Link></MenuItem>
                                        <Divider />
                                        <MenuItem onClick={(e) => { handleClose(e); logout(() => { }); }}><Link className='nav-link' to="/app/login"> Logout <LogoutIcon /></Link></MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </section>
        </nav>
    )
}
