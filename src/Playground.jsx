import React from 'react'

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import './Playground.css'

export default function Playground() {

    return (
        <div className="playground">
            <Dictaphone />
            <SpeechToText />
        </div>
    )
}

function Dictaphone() {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>transcript: {transcript}</p>
        </div>
    );
};

const SpeechToText = () => {
    const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition, error } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <div>Speech recognition not supported</div>;
    }

    if (error) {
        return <div>Error occurred: {error}</div>;
    }

    return (
        <div>
            <div>{transcript}</div>
            {listening ? (
                <div>Listening...</div>
            ) : (
                <div>Not Listening</div>
            )}
            {listening ? (
                <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
            ) : (
                    <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>Start Listening</button>
            )}
            <button onClick={resetTranscript}>Reset</button>
        </div>
    );
};
