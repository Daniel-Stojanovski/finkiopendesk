import React from "react";
import ReactDOM from 'react-dom/client'
import {HashRouter} from 'react-router-dom';
import App from './App.tsx'
import {AuthProvider} from "./shared/AuthContext";
import './shared/global.scss'
import 'bootstrap-icons/font/bootstrap-icons.css';

// dark theme toggle
// document.documentElement.setAttribute("data-theme", "dark");

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <HashRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </HashRouter>
    </React.StrictMode>,
)
