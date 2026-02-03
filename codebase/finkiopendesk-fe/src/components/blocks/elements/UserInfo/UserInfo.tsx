import {useAuth} from "../../../../shared/AuthContext";
import {useNavigate} from "react-router-dom";

const UserInfo = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <>
            <hr/>
            {user
            ? <><p>{user?.email}</p> <button onClick={handleLogout}>Log out</button></>
            : <><p>Guest</p> <button onClick={handleLogin}>Login</button></>}
        </>

    );
}

export default UserInfo;