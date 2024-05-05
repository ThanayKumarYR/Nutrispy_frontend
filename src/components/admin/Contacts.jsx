import React, { useEffect, useState } from 'react'

import './css/Contacts.css'
import { Alert, Box, Button, Card, CardActions, CardContent, Tooltip, Typography } from '@mui/material'
import { axios } from '../../utilities'
import { Refresh } from '@mui/icons-material'

export default function Contacts() {

    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({
        "message": "",
        "status": "",
        "display": false
    })
    const [contactResponse, setContactResponse] = useState({
        "data": [
            {
                "company": "lytx",
                "email": "sujan@gmail.com",
                "id": "0FnaXpxWXMV7ulOxloZN",
                "message": "I love you",
                "name": "Sujan",
                "number": "7259813815"
            },
            {
                "company": "Sudhanva",
                "email": "idiot@gmail.com",
                "id": "hCdarc2MlvjRLPcuK0Zr",
                "message": "I love you",
                "name": "Sudhanva",
                "number": "7259813815"
            },
            {
                "company": "Stupid",
                "email": "idiot@gmail.com",
                "id": "q9FJMAnrswKWxTunRLbD",
                "message": "I love you",
                "name": "Sujan",
                "number": "7259813815"
            }
        ],
        "response": "success",
        "statusCode": 200
    }
    )

    async function getAllContacts() {
        if (loading) return
        setLoading(true)
        console.log("getting all contacts");
        axios.getting("/contact", undefined)
            .then((response) => {
                console.log(response.data.response)
                if (response.data.response.toLowerCase().includes('success')) {
                    setContactResponse(response)
                    setAlert({
                        "message": "Successfully fetched the contacts",
                        "status": "success",
                        "display": true
                    })
                }
                else {
                    setContactResponse({})
                    console.error(response.data)
                    setAlert({
                        "message": "Failed to fetch the contacts",
                        "status": "error",
                        "display": true
                    })
                }
            })
            .catch((error) => {
                setContactResponse({})
                console.error(error)
                setAlert({
                    "message": "Failed to fetch the contacts",
                    "status": "error",
                    "display": true
                })
            })
            .finally(() => {
                setLoading(false)
                setTimeout(() => {
                    setAlert((oldAlert) => ({
                        ...oldAlert,
                        "display": false
                    }))
                }, 3000)
            })
    }

    function deleteContact(id) {
        if (loading) return
        axios.deleting(`/contact/${id}`, undefined)
            .then(response => {
                console.log(response)
                if (response.response.toLowerCase().includes('success')) {
                    setAlert({
                        "message": "Successfully deleted the contact",
                        "status": "success",
                        "display": true
                    })
                    getAllContacts()
                }
                else {
                    setContactResponse({})
                    console.error(response.data.data)
                    setAlert({
                        "message": "Failed to delete the contacts",
                        "status": "error",
                        "display": true
                    })
                    setLoading(false)
                }
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            })
            .finally(() => {
                setTimeout(() => {
                    setAlert((oldAlert) => ({
                        ...oldAlert,
                        "display": false
                    }))
                }, 3000)
            })
    }

    function deleteAll() {
        axios.deleting("/contact", undefined)
            .then(response => {
                console.log(response)
                if (response.response.toLowerCase().includes('success')) {
                    setContactResponse({})
                    setAlert({
                        "message": "Successfully deleted all the contacts",
                        "status": "success",
                        "display": true
                    })
                }
                else {
                    // setContactResponse({})
                    console.error(response.data.data)
                    setAlert({
                        "message": "Failed to delete all the contacts",
                        "status": "error",
                        "display": true
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        // getAllContacts();
    }, [])

    return (
        <section className='contacts'>
            {JSON.stringify(contactResponse)}
            {alert.display &&
                <Alert variant="filled" severity={alert.status} sx={{ m: 1, maxWidth: "300px", mx: "auto" }} >
                    {alert.message}
                </Alert>}
            <Box textAlign="center" sx={{ m: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                <Typography variant="h5" color="text.primary" >
                    Contacts
                </Typography>
                <Tooltip title="Refresh Contacts">
                    <Refresh className={`refresh-icon ${loading ? "loading" : ""}`} color='primary' variant="filled" onClick={getAllContacts} />
                </Tooltip>
                <Button variant="contained" color="error" onClick={deleteAll}>Delete All</Button>
            </Box>
            <Box textAlign="center">
                {loading ?
                    <Typography variant="body1" color="text.primary" >
                        Fetching contact details...
                    </Typography>
                    :
                    ""}
            </Box>
            <Box className='contact-cards-div' sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {contactResponse.data?.length ?
                    contactResponse.data.map((contact, index) =>
                        <Card sx={{ width: 300, m: 1, height: "auto" }} key={index}>
                            <CardContent>
                                <Typography variant="h6" color="text.secondary">
                                    {contact.name}
                                </Typography>
                                <Typography variant='subtitle1' color="text.secondary" gutterBottom>
                                    {contact.company || `‎ `}
                                </Typography>
                                <Typography color="text.secondary">
                                    <a className='email' href={`mailto:${contact.email} `}>Email: {contact.email}</a>
                                </Typography>
                                <Typography color="text.secondary">
                                    <a className='phone' href={`tel:${contact.number}`}>Phone: {contact.number}</a>
                                </Typography>
                                <Typography variant="body1">
                                    {contact.message}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="medium" variant="contained" color='error' onClick={() => deleteContact(contact.id)}>Delete</Button>
                            </CardActions>
                        </Card>
                    )
                    :
                    loading ? "" : "No contacts"
                }
            </Box>
        </section >
    )
}
