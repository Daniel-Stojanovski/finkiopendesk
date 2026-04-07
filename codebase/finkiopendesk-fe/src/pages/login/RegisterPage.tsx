import "./loginFormPages.scss"
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import {auth} from "../../shared/axios";

const RegisterPage = () => {

    const [studentForm, setStudentForm] = useState({
        email: "",
    });
    const [userForm, setUserForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleStudentFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
    };

    const handleUserFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value });
    };

    const handleRegisterStudent = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await auth.post('students/create', null, {
                params: { email: studentForm.email }
            });

            navigate(`/confirm`);
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed.");
        }
    };

    const handleRegisterUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (userForm.password !== userForm.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await auth.post('users/create', userForm);
            navigate('/careers');
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed.");
        }
    };

    return (
        <div className="login-page">
            <div className="card">
                <img src={"./src/logo/logo-compact-finkiopendesk-500x250.png"} width={250} height={125}/>
                <h2>Create account</h2>

                <form onSubmit={handleRegisterStudent}>
                    <input name="email" type="email" placeholder="Student e-mail" value={studentForm.email} onChange={handleStudentFormChange} required />

                    <button type="submit">
                        Register as Student
                    </button>
                </form>
                or
                <form onSubmit={handleRegisterUser}>
                    <input name="email" type="email" placeholder="E-mail" value={userForm.email} onChange={handleUserFormChange} required />
                    <input name="password" type="password" placeholder="Password" value={userForm.password} onChange={handleUserFormChange} required />
                    <input name="confirmPassword" type="password" placeholder="Confirm password" value={userForm.confirmPassword} onChange={handleUserFormChange} required />

                    {error && <p className="error" onClick={() => {
                        setStudentForm({email:""});
                        setUserForm({email:"", password: "", confirmPassword: ""});
                        setError("")}}>
                        {error} <i className="bi bi-arrow-clockwise"></i>
                    </p>}

                    <button type="submit">Register</button>

                    <span onClick={() => navigate("/login")}>Already registered? Login now! <i className="bi bi-arrow-right-short"></i></span>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;