import './Playground.css'

import React, { useState } from 'react'
import { Box, InputLabel, MenuItem, Select } from '@mui/material'
// import SendIcon from '@mui/icons-material/Send';
// import { LoadingButton } from '@mui/lab';

// import MicNoneIcon from '@mui/icons-material/MicNone';
// import MicIcon from '@mui/icons-material/Mic';

// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { BarChart, PieChart, pieArcLabelClasses } from '@mui/x-charts';

export default function Playground() {

    document.title = "NutriSpy - Play"
    const [chartType, setChartType] = useState(0)

    // const [loading, setLoading] = useState(false)
    // const [userQuestion, setUserQuestion] = useState("")
    // const [error, setError] = useState({
    //     "message": ""
    // })


    // const windowRef = useRef();

    // const [userYallaMessages, setUserYallaMessages] = useState([])

    // function setTheError(data) {
    //     setError(data)
    //     setTimeout(() => {
    //         setError({})
    //     }, 5000)
    // }

    // function handleChat(e) {
    //     e.preventDefault()
    //     resetTranscript()
    //     setLoading(true)
    //     setUserQuestion("")

    //     var updatedConversations = [
    //         ...userYallaMessages,
    //         { "question": transcript || userQuestion, answer: "" }
    //     ];
    //     setUserYallaMessages(updatedConversations);

    //     updatedConversations[updatedConversations.length - 1].answer = "AH! Dummy answer"
    //     setUserYallaMessages(updatedConversations);
    //     setTimeout(() => {
    //         e.target.message.focus()
    //         windowRef.current.scrollTo({
    //             top: windowRef.current.scrollHeight + 1000,
    //             left: 0,
    //             behavior: "smooth",
    //         });
    //     }, 100)

    //     setLoading(false)
    // }

    // const {
    //     transcript,
    //     listening,
    //     resetTranscript,
    //     browserSupportsSpeechRecognition,
    // } = useSpeechRecognition();

    return (
        <main className='chat'>
            {JSON.stringify([
                {
                    "index": 0,
                    "img": "blob:http://192.168.74.145:3000/98f3f73f-d4f7-4b05-82a7-e9981f7e5b06",
                    "details": {
                        "food": "yes",
                        "name": "watermelon",
                        "type": "Healthy Food",
                        "nutrients": {
                            "name": "watermelon",
                            "quantity": 1,
                            "measurement": "bowl",
                            "calories": 100,
                            "fat": 100,
                            "protiens": 200
                        }
                    }
                },
                {
                    "index": 1,
                    "img": "",
                    "details": {
                        "food": "yes",
                        "name": "Chole Bhature",
                        "nutrients": {
                            "Food Type": "Indian",
                            "name": "Chole Bhature",
                            "quantity": 1,
                            "measurement": "pieces",
                            "calories": 500,
                            "protien": "12.5gm",
                            "carbohydrates": "55gm",
                            "Fat": "27",
                            "Sodium": "650mg",
                            "Fiber": "6.5g",
                            "Sugars": "8.6g",
                            "Vitamin": "a,c,k,b6,b9b2,b1,b3",
                            "Calcium": "122mg",
                            "Iron": "3.6mg",
                            "Potassium": "526.3mg",
                            "Cholestrol": "5.7mg"
                        }
                    },
                    "Food Type": "Indian",
                    "name": "Chole Bhature",
                    "quantity": 1,
                    "measurement": "pieces",
                    "calories": 500,
                    "protien": "12.5gm",
                    "carbohydrates": "55gm",
                    "Fat": "27",
                    "Sodium": "650mg",
                    "Fiber": "6.5g",
                    "Sugars": "8.6g",
                    "Vitamin": "a,c,k,b6,b9b2,b1,b3",
                    "Calcium": "122mg",
                    "Iron": "3.6mg",
                    "Potassium": "526.3mg",
                    "Cholestrol": "5.7mg"
                },
                {
                    "index": 2,
                    "img": "",
                    "details": {
                        "food": "yes",
                        "name": "fadsf",
                        "nutrients": {
                            "name": "fadsf",
                            "quantity": 4,
                            "measurement": "spoon",
                            "calories": "200"
                        }
                    },
                    "name": "fadsf",
                    "quantity": 4,
                    "measurement": "spoon",
                    "calories": "200"
                },
                {
                    "index": 3,
                    "img": "blob:http://192.168.74.145:3000/2cc92949-046d-4d80-a301-d8befe741c86",
                    "details": {
                        "food": "no",
                        "name": null,
                        "type": null
                    }
                }
            ].filter(e => e.details.food === "yes").map(f => {
                return {
                    "name": f.details.name,
                    "type": f.details.type || f.details.nutrients["Food Type"] || null,
                    "quantity": f.details.nutrients.quantity,
                    "measurement": f.details.nutrients.measurement,
                    "calories": f.details.nutrients.calories,
                }
            }))}
            {/* <h2 >Chat</h2>
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
                            if (listening)
                                SpeechRecognition.stopListening()
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
                    >
                        {listening ? <MicIcon /> : <MicNoneIcon />}
                    </button>
                </Box>
                <LoadingButton loading={loading} variant='contained' className='send-btn' disabled={listening || (!(userQuestion.length || transcript) || loading)} type='submit'>
                    <SendIcon />
                </LoadingButton>
            </Box>
        */}

            <Box sx={{ width: 100 }}>
                <InputLabel id="chart-type">Chart Type</InputLabel>
                <Select
                    fullWidth
                    labelId="chart-type"
                    value={chartType}
                    label="Chart Type"
                    defaultValue='All'
                    onChange={(e) => {
                        setChartType(e.target.value)
                    }}
                >
                    <MenuItem value="0">0</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                </Select>
            </Box>
            <Box fullWidth>
                {charts[chartType]}
            </Box>
        </main>
    )
}

// function LeftMessage({ m }) {

//     const formatMessage = (message) => {
//         if (!message) return message
//         try {
//             const formattedMessage = message.replace(/(\d+\.) /g, '<br />$1 ');
//             const boldRegex = /\*\*(.*?)\*\*/g;
//             const boldFormatted = formattedMessage.replace(boldRegex, '<b>$1</b>');
//             return boldFormatted;
//         }
//         catch (e) {
//             console.log(e);
//             return message;
//         }
//     };

//     return (
//         <p className='left-msg' dangerouslySetInnerHTML={{ __html: formatMessage(m) }} />
//     );
// }
// function RightMessage({ m }) {
//     return (
//         <p className='right-msg'>
//             {m}
//         </p>
//     )
// }


const charts = [
    <PieChart
        className='chart'
        hideTooltip
        slotProps={{ legend: { hidden: true } }}
        series={[
            {
                arcLabel: (item) => `${item.label} (${item.value})`,
                arcLabelMinAngle: 45,
                data: [{ value: 30, label: 'Carbohydrates' },
                { value: 15, label: 'Protiens' },
                { value: 10, label: 'Fat' },
                { value: 10, label: 'Others' }],
            },
        ]}
        sx={{
            [`& .${pieArcLabelClasses.root}`]: {
                fill: 'white',
                fontWeight: 'bold',
            },
        }}
        height={300}
        width={440}
    />,

    <PieChart
        className='chart'
        hideTooltip
        slotProps={{ legend: { hidden: true } }}
        series={[
            {
                arcLabel: (item) => `${item.label} (${item.value})`,
                arcLabelMinAngle: 45,
                data: [{ value: 6, label: 'Others' },
                { value: 8, label: 'Weight Lifting' },
                { value: 12, label: 'Jogging' },
                { value: 20, label: 'Push Ups' }],
            },
        ]}
        sx={{
            [`& .${pieArcLabelClasses.root}`]: {
                fill: 'white',
                fontWeight: 'bold',
            },
        }}
        height={300}
        width={440}
    />,


    <BarChart
        series={[
            { data: [4, 2, 5, 4, 1], stack: 'A', label: 'Series A1' },
            { data: [2, 8, 1, 3, 1], stack: 'A', label: 'Series A2' },
            { data: [14, 6, 5, 8, 9], label: 'Series B1' },
        ]}
        barLabel={(item, context) => {
            if ((item.value ?? 0) > 10) {
                return 'High';
            }
            return context.bar.height < 60 ? null : item.value?.toString();
        }}
        width={700}
        height={350}
    />,

    <BarChart
        series={[
            { data: [4, 2, 5, 4, 1], stack: 'A', label: 'Series A1' },
            { data: [2, 8, 1, 3, 1], stack: 'A', label: 'Series A2' },
            { data: [14, 6, 5, 8, 9], label: 'Series B1' },
        ]}
        barLabel={(item, context) => {
            if ((item.value ?? 0) > 10) {
                return 'High';
            }
            return context.bar.height < 60 ? null : item.value?.toString();
        }}
        width={600}
        height={350}
    />,

    <BarChart
        xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
        width={500}
        height={300}
        barLabel="value"
    />

]