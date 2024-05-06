import React, { useRef, useState } from 'react'
import './css/Chat.css'
import { Box, Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';


export default function Chat() {

    document.title = "NutriSpy - Chat"

    const [loading, setLoading] = useState(false)
    const [userMessage, setUserMessage] = useState("")

    const windowRef = useRef();

    const [userYallaMessages, setUserYallaMessages] = useState([
        {
            "question": "question 1",
            "answer": "answer 1"
        },
        {
            "question": "question 2",
            "answer": "answer 2"
        },
        {
            "question": "question 3",
            "answer": "answer 3"
        },
        {
            "question": "question 4",
            "answer": "answer 4"
        },
        {
            "question": "question 5",
            "answer": "answer 5"
        },
    ])

    function handleChat(e) {
        e.preventDefault()
        e.target.message.focus()
        setLoading(true)
        setUserYallaMessages(oldMessages => {
            oldMessages.push({ "question": userMessage, "answer": "GNITAW" })
            return oldMessages
        })

        setUserMessage("")

        // axios.getting("/", userMessage)
        //     .then(response => {
        //         console.log(response)
        //         if (response.response.toLowerCase().includes("success")) {
        //             setUserYallaMessages(oldMessages => {
        //                 oldMessages.push("from gpt")
        //                 return oldMessages
        //             })
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        //     .finally(() => {
        //         setLoading(false)
        //     })
        setTimeout(() => {
            windowRef.current.scrollTo({
                top: windowRef.current.scrollHeight + 1000,
                left: 0,
                behavior: "smooth",
            });
        }, 100)
        setLoading(false)
    }

    return (
        <main className='chat'>
            <h2>Chat</h2>
            {/* <Alert variant="filled" severity="error" sx={{ m: 1, maxWidth: "300px", mx: "auto" }} >
                {alert.message}
            </Alert> */}
            <Box
                className='chat-window'
                ref={windowRef}
            >

                {userYallaMessages.length > 0 ?
                    userYallaMessages.map((convo, index) => {
                        return (
                            <React.Fragment key={index}>
                                <RightMessage m={convo.question} />
                                <LeftMessage m={convo.answer} />
                            </React.Fragment>
                        )
                    })
                    : ""}
            </Box>
            <Box
                component="form"
                onSubmit={handleChat}
                className='form-control'>
                <textarea
                    autoFocus
                    name="message"
                    label="Ask me"
                    className='message-input'
                    value={userMessage}
                    autoComplete="off"
                    placeholder='Ask me ...'
                    onChange={e => setUserMessage(e.target.value)}
                />
                <Button variant='contained' className='send-btn' disabled={(!userMessage.length || loading)} type='submit'>
                    <SendIcon />
                </Button>
            </Box>
        </main>
    )
}

function LeftMessage({ m }) {
    return (
        <p className='left-msg'>
            {m}
        </p>
    )
}
function RightMessage({ m }) {
    return (
        <p className='right-msg'>
            {m}
        </p>
    )
}