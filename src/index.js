import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path="app" exact element={<h1>App</h1>} />
                <Route path="/" element={<App />} />
            </Routes>
        </HashRouter>
    </React.StrictMode>
);

reportWebVitals();