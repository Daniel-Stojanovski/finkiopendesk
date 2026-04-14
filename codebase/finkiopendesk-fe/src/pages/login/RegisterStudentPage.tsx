import "./loginFormPages.scss"
import { useSearchParams, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {auth} from "../../shared/axios";
import {validatePassword} from "../../shared/hooks";
import LogoImage from "../../logo/logo-compact-finkiopendesk-500x250.png";
import {useAuth} from "../../shared/AuthContext";

const RegisterStudentPage = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const { fetchUser } = useAuth();
    const token = params.get("token");

    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const passwordError = validatePassword(password);

    const submitData = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordError) {
            setError(passwordError);
            return;
        }

        if (password !== confirmationPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await auth.post('students/activate', { token, password });
            localStorage.setItem("token", res.data);

            await fetchUser();

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
                <img src={LogoImage} alt="finkiopendesk_compact_icon_long_large" width={250} height={125}/>
                <h2>Set your password</h2>

                <form onSubmit={submitData}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmationPassword}
                        onChange={e => setConfirmationPassword(e.target.value)}
                    />

                    {password.length > 0 && (
                        <ul className="password-rules">
                            <li className={password.length >= 8 ? "valid" : ""}>
                                <i className={`bi ${password.length >= 8 ? "bi-check-circle" : "bi-circle"}`}></i>
                                Must be at least 8 characters
                            </li>

                            <li className={/[A-Z]/.test(password) ? "valid" : ""}>
                                <i className={`bi ${/[A-Z]/.test(password) ? "bi-check-circle" : "bi-circle"}`}></i>
                                Must include uppercase letter
                            </li>

                            <li className={/[0-9]/.test(password) ? "valid" : ""}>
                                <i className={`bi ${/[0-9]/.test(password) ? "bi-check-circle" : "bi-circle"}`}></i>
                                Must include number
                            </li>

                            <li className={/[!@#$%^&*_+=\-]/.test(password) ? "valid" : ""}>
                                <i className={`bi ${/[!@#$%^&*_+=\-]/.test(password) ? "bi-check-circle" : "bi-circle"}`}></i>
                                Special character
                            </li>

                            {passwordError == null &&
                                (confirmationPassword.length > 0 && (
                                    <li className={`password-match ${password === confirmationPassword ? "valid" : "invalid"}`}>
                                        <i className={`bi ${password === confirmationPassword ? "bi-check-circle" : "bi-x-circle"}`}></i>
                                        {password === confirmationPassword ? "Passwords match" : "Passwords do not match"}
                                    </li>
                                )
                            )}
                        </ul>
                    )}

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