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
                ? <>
                    {user?.student ? <i className="bi bi-person-fill-check"></i> : <i className="bi bi-person-fill"></i>}
                    <p>{user?.email.split("@")[0]}</p>
                    <i className="bi bi-box-arrow-right" onClick={handleLogout}></i>
                </>
                : <>
                    <i className="bi bi-person-fill-exclamation"></i>
                    <p>Guest</p>
                    <i className="bi bi-box-arrow-in-right" onClick={handleLogin}></i>
                </>
            }
        </div>

    );
}

export default UserInfo;