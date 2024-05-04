import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter, Route, Routes } from "react-router-dom";
import Appli from "./components/app/Appli";
import Admin from "./components/admin/Admin";

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#f1cf90',
            contrastText: '#000000',
            light: '#f9e8c1',
            dark: '#d9ad5a',
        },
        secondary: {
            main: '#4a1d1d',
        },
        text: {
            primary: '#333333',
            secondary: '#666666',
            disabled: '#cccccc',
        },
        background: {
            paper: '#f8f4ea',
        },
        warning: {
            main: '#ffbf7f',
        },
    },
});


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <HashRouter>
                <Routes>
                    <Route path="/app/*" element={<Appli />} />
                    <Route path="/admin/*" element={<Admin />} />
                    <Route path="/" element={<App />} />
                    {/* <Route path="/*" element={<Navigate to="/app" />} /> */}
                </Routes>
            </HashRouter>
        </ThemeProvider>
    </React.StrictMode>
);
