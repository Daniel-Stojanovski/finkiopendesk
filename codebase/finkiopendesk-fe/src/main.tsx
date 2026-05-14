import React from "react";
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx'
import {AuthProvider} from "./shared/AuthContext";
import './shared/global.scss'
import 'bootstrap-icons/font/bootstrap-icons.css';

// dark theme toggle
// document.documentElement.setAttribute("data-theme", "dark");

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
