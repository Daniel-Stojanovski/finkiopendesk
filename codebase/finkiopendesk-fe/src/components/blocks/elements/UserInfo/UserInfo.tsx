import './userInfo.scss';
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
        <div id="userinfo-box">
            {user
                ? <><i className="bi bi-person-fill"></i><p>{user?.email.split("@")[0]}</p> <button onClick={handleLogout}><i className="bi bi-box-arrow-right"></i></button></>
                : <><i className="bi bi-person-fill-exclamation"></i><p>Guest</p> <button onClick={handleLogin}><i className="bi bi-box-arrow-in-right"></i></button></>}
        </div>

    );
}

export default UserInfo;