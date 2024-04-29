import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Appli from "./components/app/Appli";
import Food from "./components/app/Food";
import Exercise from "./components/app/Exercise";
import Dashborard from "./components/app/Dashborard";
import Navbar from "./components/app/Navbar";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path="/app/*" element={<Appli />} />
                <Route path="/" element={<App />} />
                {/* <Route path="/*" element={<Navigate to="/app" />} /> */}
            </Routes>
        </HashRouter>
    </React.StrictMode>
);
