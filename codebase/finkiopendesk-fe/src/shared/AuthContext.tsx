import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./axios";
import type {AuthContextDto} from "./dto/AuthContextDto";
import type {UserDto} from "./dto/UserDto";

const AuthContext = createContext<AuthContextDto | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserDto | null>(null);

    const fetchUser = async () => {
        const token = localStorage.getItem("token");
        const res = await auth.get<UserDto>("/user", {
            headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, fetchUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};
