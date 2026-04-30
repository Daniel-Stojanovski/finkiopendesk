import { createContext, useContext, useEffect, useState } from "react";
import {authprivate, backapi} from "./axios";
import { useAuth } from "./AuthContext";
import type { UserFavoriteDto } from "./dto/UserFavoriteDto";
import type {ProgramDto} from "./dto/ProgramDto";
import type {UserDataContextDto} from "./dto/UserDataDto";

const UserDataContext = createContext<UserDataContextDto | undefined>(undefined);

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState<UserFavoriteDto[]>([]);
    const [selectedUserProgram, setSelectedUserProgram] = useState<ProgramDto | null>(null);

    useEffect(() => {
        if (!user?.userId) return;

        backapi.get(`/favorites/${user.userId}`)
            .then(res => setFavorites(res.data));

        authprivate.get("/user")
            .then(res => {
                setSelectedUserProgram(res.data.selectedProgram ?? null);
            })
            .catch(err => console.error(err));
    }, [user?.userId]);

    const setUserProgram = async (program: ProgramDto | null) => {
        if (!user?.userId) return;

        try {
            if (!program) {
                await authprivate.delete("/user/program");
                setSelectedUserProgram(null);
            } else {
                await authprivate.post(`/user/program/${program.programId}`);
                setSelectedUserProgram(program);
            }
        } catch (err) {
            console.error("Failed to set user program", err);
        }
    };

    const toggleFavorite = async (targetId: string, targetType: "subject" | "profession" | "channel") => {
        if (!user?.userId) return;

        try {
            const res = await backapi.post<UserFavoriteDto>(`/favorites/${user.userId}/set`, {
                targetId,
                targetType
            });

            await setFavorites(prev =>
                prev.some(f => f.targetId === targetId && f.targetType === targetType)
                    ? prev.filter(f => !(f.targetId === targetId && f.targetType === targetType))
                    : [...prev, res.data]
            );

        } catch (err) {
            console.error("Failed to toggle discussion as favorite", err);
        }
    };

    return (
        <UserDataContext.Provider value={{ favorites, setFavorites, toggleFavorite, selectedUserProgram, setUserProgram }}>
            {children}
        </UserDataContext.Provider>
    );
};

export const useUserData = () => {
    const context = useContext(UserDataContext);
    if (!context) throw new Error("useUserData must be used inside UserDataProvider");
    return context;
};