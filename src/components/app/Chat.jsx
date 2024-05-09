import React, { useEffect, useRef, useState } from 'react'
import './css/Chat.css'
import { Alert, Box } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { customAxios } from '../../utilities'
import { LoadingButton } from '@mui/lab';

export default function Chat() {

    document.title = "NutriSpy - Chat"

    const [loading, setLoading] = useState(false)
    const [userQuestion, setUserQuestion] = useState("")
    const [error, setError] = useState({})

    const windowRef = useRef();

    const [userYallaMessages, setUserYallaMessages] = useState([])

    async function fetchOldConversations() {
        customAxios.getting('/recommend', undefined)
            .then(response => {
                if (response.data.response.toLowerCase() === "success") {
                    setUserYallaMessages(response.data.data)
                    console.log("Got old messages", response.data.data)
                } else {
                    setError(response.data)
                }
            })
            .catch(error => {
                setError(error)
            }
            )
            .finally(() => {
                setTimeout(() => {
                    windowRef.current?.scrollTo({
                        top: windowRef.current.scrollHeight + 1000,
                        left: 0,
                        behavior: "smooth",
                    });
                }, 2000)
            })
    }

    useEffect(() => {
        fetchOldConversations()
    }, [])

    function handleChat(e) {
        e.preventDefault()
        setLoading(true)
        setUserQuestion("")

        customAxios.posting("/recommend", { "question": userQuestion })
            .then(response => {
                console.log("handle chat")
                console.log(response.data)
                if (response.data.response.toLowerCase().includes("success")) {
                    const updatedConversations = [
                        ...userYallaMessages,
                        { "question": userQuestion, answer: response.data.data }
                    ];
                    setUserYallaMessages(updatedConversations);
                }
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })
        setTimeout(() => {
            e.target.message.focus()
            windowRef.current.scrollTo({
                top: windowRef.current.scrollHeight + 1000,
                left: 0,
                behavior: "smooth",
            });
        }, 100)
    }

    return (
        <main className='chat'>
            <h2>Chat</h2>
            <div className='error-div'>
                {error.message?.length > 0 && <Alert variant="filled" severity="error" sx={{ m: 1, maxWidth: "300px", mx: "auto" }} >
                    {error.message}
                </Alert>}
            </div>
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
                    value={userQuestion}
                    autoComplete="off"
                    placeholder='Ask me ...'
                    onChange={e => setUserQuestion(e.target.value)}
                />
                <LoadingButton loading={loading} variant='contained' className='send-btn' disabled={(!userQuestion.length || loading)} type='submit'>
                    <SendIcon />
                </LoadingButton>
            </Box>
        </main>
    )
}

function LeftMessage({ m }) {

    const formatMessage = (message) => {
        try {

            const formattedMessage = message.replace(/(\d+\.) /g, '<br />$1 ');

            const boldRegex = /\*\*(.*?)\*\*/g;

            const boldFormatted = formattedMessage.replace(boldRegex, '<b>$1</b>');

            return boldFormatted;
        }
        catch (e) {
            console.log(e);
            return message;
        }
    };

    return (
        <p className='left-msg' dangerouslySetInnerHTML={{ __html: formatMessage(m) }} />
    );
}
function RightMessage({ m }) {
    return (
        <p className='right-msg'>
            {m}
        </p>
    )
}