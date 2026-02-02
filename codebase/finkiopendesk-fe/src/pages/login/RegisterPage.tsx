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
        setStudentForm({
            ...studentForm,
            [e.target.name]: e.target.value
        });
    };

    const handleUserFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserForm({
            ...userForm,
            [e.target.name]: e.target.value
        });
    };

    const handleRegisterStudent = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await auth.post('students/create', null, {
                params: {
                    email: studentForm.email
                }
            })
            const token = res.data;

            navigate(`/register/activate?token=${token}`);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Registration failed. Please try again."
            );
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
            await auth.post('users/create', {
                email: userForm.email,
                password: userForm.password
            })

            navigate('/');
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Registration failed. Please try again."
            );
        }
    };

    return (
        <div className="register-container">
            <h2>Create account</h2>

            <form onSubmit={handleRegisterUser}>
                <input
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    value={userForm.email}
                    onChange={handleUserFormChange}
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={userForm.password}
                    onChange={handleUserFormChange}
                    required
                />

                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={userForm.confirmPassword}
                    onChange={handleUserFormChange}
                    required
                />

                {error && <p className="error">{error}</p>}

                <button type="submit">
                    Register
                </button>
            </form>

            <hr/>
            <p>or</p>
            <hr/>

            <form onSubmit={handleRegisterStudent}>
                <input
                    name="email"
                    type="email"
                    placeholder="Student e-mail"
                    value={studentForm.email}
                    onChange={handleStudentFormChange}
                    required
                />

                {error && <p className="error">{error}</p>}

                <button type="submit">
                    Register as Student
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
