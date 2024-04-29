import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Appli from "./components/app/Appli";


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
