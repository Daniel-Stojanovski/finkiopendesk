import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {auth} from "../../shared/axios";

const RegisterStudentPage = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const token = params.get("token");

    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const submit = async () => {
        if (password !== confirmationPassword) {
            setError("Passwords do not match");
            return;
        }

        await auth.post('students/activate', { token, password })
        navigate("/");
    };

    if (!token) {
        return <p>Invalid activation link</p>;
    }

    return (
        <div>
            <h2>Set your password</h2>

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

            {error && <p>{error}</p>}

            <button onClick={submit}>Activate account</button>
        </div>
    );
}

export default RegisterStudentPage;