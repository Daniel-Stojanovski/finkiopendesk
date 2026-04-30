import './userInfo.scss';
import {useAuth} from "../../../../shared/AuthContext";
import { useUserData } from "../../../../shared/UserDataContext";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import type {ProgramDto} from "../../../../shared/dto/ProgramDto";
import {backapi} from "../../../../shared/axios";

const UserInfo = () => {
    const { user, logout } = useAuth();
    const { selectedUserProgram, setUserProgram } = useUserData();
    const navigate = useNavigate();

    const [programs, setPrograms] = useState<ProgramDto[]>([]);

    const [isOpen, setIsOpen] = useState(false);

    const toggleProgramSelection = async (program: ProgramDto) => {
        if (selectedUserProgram?.programId == program.programId) {
            await setUserProgram(null);
        }
        else {
            await setUserProgram(program);
        }
    }

    useEffect(() => {
        backapi.get("/program")
            .then(res => setPrograms(res.data))
            .catch(err => console.error("Failed to load programs", err));
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <>
            <div id="userinfo-box">
                {user
                    ? <>
                        <span className="user-data">
                            {user?.student ? <i className="bi bi-person-fill-check"></i> : <i className="bi bi-person-fill"></i>}
                            <p className="user-username">{user?.email.split("@")[0]}</p>
                        </span>

                        <span className="user-actions">
                            {user?.student && (
                                <span onClick={() => setIsOpen(prev => !prev)} className={`program-select-pill ${selectedUserProgram ? 'selected' : ''}`}>
                                    {selectedUserProgram
                                        ? <span>#{selectedUserProgram.name}</span>
                                        : <i className="bi bi-plus-lg"></i>
                                    }
                                </span>
                            )}
                            <i className="bi bi-box-arrow-right log-button" onClick={handleLogout}></i>
                        </span>
                    </>
                    : <>
                        <span className="user-data">
                            <i className="bi bi-person-fill-exclamation"></i>
                            <p>Guest</p>
                        </span>
                        <span className="user-actions">
                            <i className="bi bi-box-arrow-in-right" onClick={handleLogin}></i>
                        </span>
                    </>
                }
            </div>

            {isOpen && (
                <ul id="program-select-menu">
                    {programs.map(program => (
                        <li
                            key={program.programId}
                            className={`program-option ${selectedUserProgram?.programId == program.programId ? 'selected' : ''}`}
                            onClick={() => {
                                toggleProgramSelection(program);
                                setIsOpen(false);
                            }}
                        >
                            {program.name}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

export default UserInfo;