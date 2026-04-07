import "./loginFormPages.scss"
import { useSearchParams, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {auth} from "../../shared/axios";

const RegisterStudentPage = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const token = params.get("token");

    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const submitData = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmationPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await auth.post('students/activate', { token, password });
            navigate("/careers");
        } catch (err: any) {
            setError("Activation failed");
        }
    };

    if (!token) {
        return <p>Invalid activation link</p>;
    }

    return (
        <div className="login-page">
            <div className="card">
                <img src={"./src/logo/logo-compact-finkiopendesk-500x250.png"} width={250} height={125}/>
                <h2>Set your password</h2>

                <form onSubmit={submitData}>
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Confirm password"
                        onChange={e => setConfirmationPassword(e.target.value)}
                    />

                    {error && <p className="error" onClick={() => {
                        setPassword("");
                        setConfirmationPassword("");
                        setError("")}}>
                        {error} <i className="bi bi-arrow-clockwise"></i>
                    </p>}

                    <button type="submit">Activate account</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterStudentPage;