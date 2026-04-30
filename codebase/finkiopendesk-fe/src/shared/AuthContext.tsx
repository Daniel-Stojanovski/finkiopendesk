import { createContext, useContext, useEffect, useState } from "react";
import { authprivate } from "./axios";
import type {AuthContextDto} from "./dto/AuthContextDto";
import type {UserDto} from "./dto/UserDto";
import {UserDataProvider} from "./UserDataContext";

const AuthContext = createContext<AuthContextDto | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserDto | null>(null);

    const fetchUser = async () => {
        const token = localStorage.getItem("token");

        if (!token) return;
        const res = await authprivate.get<UserDto>("/user");
        setUser(res.data);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, fetchUser, logout }}>
            <UserDataProvider>
                {children}
            </UserDataProvider>
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};
