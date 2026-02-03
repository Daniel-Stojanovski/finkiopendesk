import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {auth} from "../../shared/axios";
import {useAuth} from "../../shared/AuthContext";


const LoginPage = () => {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const { user, fetchUser } = useAuth();

    useEffect(() => {
        if (user) {
            navigate("/", { replace: true });
        }
    }, [user, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await auth.post('/login', {
                email: loginForm.email,
                password: loginForm.password
            })
            const token = res.data;

            localStorage.setItem("token", token);
            await fetchUser();
            navigate("/");
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Registration failed. Please try again."
            );
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    value={loginForm.email}
                    onChange={handleChange}
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={handleChange}
                    required
                />

                {error && <p className="error">{error}</p>}

                <button type="submit">
                    Login
                </button>
            </form>

        </div>
    );
};

export default LoginPage;
