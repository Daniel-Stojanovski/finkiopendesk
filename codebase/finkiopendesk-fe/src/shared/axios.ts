import axios from "axios";
const token = localStorage.getItem("token");

export const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json"
    }
});

export const backapi = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
});

export const auth = axios.create({
    baseURL: "http://localhost:8080/auth",
    headers: {
        "Content-Type": "application/json"
    }
});