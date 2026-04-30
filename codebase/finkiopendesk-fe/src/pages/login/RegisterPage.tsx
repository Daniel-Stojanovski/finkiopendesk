import "./loginFormPages.scss"
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {authpublic} from "../../shared/axios";
import {validatePassword} from "../../shared/hooks";
import LogoImage from "../../logo/logo-compact-finkiopendesk-500x250.png";
import Spinner from "../../components/utility/Spinner/Spinner";
import {useAuth} from "../../shared/AuthContext";

const RegisterPage = () => {
    const { fetchUser } = useAuth();

    const [studentForm, setStudentForm] = useState({
        email: "",
    });
    const [userForm, setUserForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const passwordError = validatePassword(userForm.password);

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
        setIsLoading(true);

        try {
            await authpublic.post('students/create', null, {
                params: { email: studentForm.email }
            });

            navigate(`/confirm`);
            setIsLoading(false);
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed.");
            setIsLoading(false);
        }
    };

    const handleRegisterUser = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        if (userForm.password !== userForm.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await authpublic.post('users/create', userForm);
            localStorage.setItem("token", res.data);
            await fetchUser();

            navigate('/careers');
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed.");
        }
    };

    return (
        <div className="login-page">
            <div className="card">
                <img src={LogoImage} alt="finkiopendesk_compact_icon_long_large" width={250} height={125}/>
                {isLoading ? (
                    <>
                        <h2>We're managing your application.</h2>
                        <Spinner size={4} />
                    </>
                ) : (
                    <>
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

                            {userForm.password.length > 0 && (
                                <ul className="password-rules">
                                    <li className={userForm.password.length >= 8 ? "valid" : ""}>
                                        <i className={`bi ${userForm.password.length >= 8 ? "bi-check-circle" : "bi-circle"}`}></i>
                                        Must be at least 8 characters
                                    </li>

                                    <li className={/[A-Z]/.test(userForm.password) ? "valid" : ""}>
                                        <i className={`bi ${/[A-Z]/.test(userForm.password) ? "bi-check-circle" : "bi-circle"}`}></i>
                                        Must include uppercase letter
                                    </li>

                                    <li className={/[0-9]/.test(userForm.password) ? "valid" : ""}>
                                        <i className={`bi ${/[0-9]/.test(userForm.password) ? "bi-check-circle" : "bi-circle"}`}></i>
                                        Must include number
                                    </li>

                                    <li className={/[!@#$%^&*_+=\-]/.test(userForm.password) ? "valid" : ""}>
                                        <i className={`bi ${/[!@#$%^&*_+=\-]/.test(userForm.password) ? "bi-check-circle" : "bi-circle"}`}></i>
                                        Special character
                                    </li>

                                    {passwordError == null &&
                                        (userForm.confirmPassword.length > 0 && (
                                            <li className={`password-match ${userForm.password === userForm.confirmPassword ? "valid" : "invalid"}`}>
                                                <i className={`bi ${userForm.password === userForm.confirmPassword ? "bi-check-circle" : "bi-x-circle"}`}></i>
                                                {userForm.password === userForm.confirmPassword ? "Passwords match" : "Passwords do not match"}
                                            </li>
                                        ))
                                    }
                                </ul>
                            )}

                            {error && <p className="error" onClick={() => {
                                setStudentForm({email:""});
                                setUserForm({email:"", password: "", confirmPassword: ""});
                                setError("")}}>
                                {error} <i className="bi bi-arrow-clockwise"></i>
                            </p>}

                            <button type="submit">Register</button>

                            <span onClick={() => navigate("/login")}>Already registered? Login now! <i className="bi bi-arrow-right-short"></i></span>
                        </form>
                    </>
                    )
                }
            </div>
        </div>
    );
};

export default RegisterPage;