import axios from "axios";

// localStorage.removeItem("token")

export const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json"
    }
});

export const backapi = axios.create({
    baseURL: "https://finkiopendesk.onrender.com/api",
    headers: {
        "Content-Type": "application/json"
    }
});

export const authpublic = axios.create({
    baseURL: "https://finkiopendesk.onrender.com/auth",
    headers: {
        "Content-Type": "application/json"
    }
});

export const authprivate = axios.create({
    baseURL: "https://finkiopendesk.onrender.com/auth",
    headers: {
        "Content-Type": "application/json"
    }
});

backapi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

authprivate.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});