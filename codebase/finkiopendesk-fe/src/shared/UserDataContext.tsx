import { createContext, useContext, useEffect, useState } from "react";
import { backapi } from "./axios";
import { useAuth } from "./AuthContext";
import type { UserFavoriteDto } from "./dto/UserFavoriteDto";
import type {UserDataContextDto} from "./dto/UserDataDto";

const UserDataContext = createContext<UserDataContextDto | undefined>(undefined);

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState<UserFavoriteDto[]>([]);

    useEffect(() => {
        if (!user?.userId) return;

        backapi.get(`/favorites/${user.userId}`)
            .then(res => setFavorites(res.data));
    }, [user?.userId]);

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
        <UserDataContext.Provider value={{ favorites, setFavorites, toggleFavorite }}>
            {children}
        </UserDataContext.Provider>
    );
};

export const useUserData = () => {
    const context = useContext(UserDataContext);
    if (!context) throw new Error("useUserData must be used inside UserDataProvider");
    return context;
};