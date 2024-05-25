import './Playground.css'

import React, { useRef, useState } from 'react'
import { Alert, Box } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';

import MicNoneIcon from '@mui/icons-material/MicNone';
import MicIcon from '@mui/icons-material/Mic';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Playground() {

    document.title = "NutriSpy - Play"

    const [loading, setLoading] = useState(false)
    const [userQuestion, setUserQuestion] = useState("")
    const [error, setError] = useState({
        "message": ""
    })

    const windowRef = useRef();

    const [userYallaMessages, setUserYallaMessages] = useState([])

    function setTheError(data) {
        setError(data)
        setTimeout(() => {
            setError({})
        }, 5000)
    }

    function handleChat(e) {
        e.preventDefault()
        resetTranscript()
        setLoading(true)
        setUserQuestion("")

        var updatedConversations = [
            ...userYallaMessages,
            { "question": transcript || userQuestion, answer: "" }
        ];
        setUserYallaMessages(updatedConversations);

        updatedConversations[updatedConversations.length - 1].answer = "AH! Dummy answer"
        setUserYallaMessages(updatedConversations);
        setTimeout(() => {
            e.target.message.focus()
            windowRef.current.scrollTo({
                top: windowRef.current.scrollHeight + 1000,
                left: 0,
                behavior: "smooth",
            });
        }, 100)

        setLoading(false)
    }

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    return (
        <main className='chat'>
            <h2 >Chat</h2>
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
                <Box
                    component="div"
                    className='input-div'
                >
                    <textarea
                        autoFocus
                        name="message"
                        label="Ask me"
                        className='message-input'
                        value={transcript ? transcript : userQuestion}
                        autoComplete="off"
                        placeholder='Ask me...'
                        onChange={e => {
                            setUserQuestion(e.target.value)
                        }}
                        onClick={() => {
                            if (transcript) {
                                setUserQuestion(transcript)
                                resetTranscript()
                            }
                        }}
                    />
                    <button
                        className={`${listening ? "active" : ""} ${!browserSupportsSpeechRecognition ? "disabled" : ""}`}
                        onClick={(e) => {
                            e.preventDefault();
                            if (!browserSupportsSpeechRecognition) {
                                setTheError({ "message": "Your browser does not support Speech Recognition. Please use Chrome Browser" })
                                return
                            }
                            if (!browserSupportsSpeechRecognition || loading) return
                            if (listening) SpeechRecognition.stopListening()
                            SpeechRecognition.startListening();
                        }}
                    // disabled={!browserSupportsSpeechRecognition || loading}
                    >
                        {listening ? <MicIcon /> : <MicNoneIcon />}
                    </button>
                </Box>
                <LoadingButton loading={loading} variant='contained' className='send-btn' disabled={listening || (!(userQuestion.length || transcript) || loading)} type='submit'>
                    <SendIcon />
                </LoadingButton>
            </Box>
        </main>
    )
}

function LeftMessage({ m }) {

    const formatMessage = (message) => {
        if (!message) return message
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
