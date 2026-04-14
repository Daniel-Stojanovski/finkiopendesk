import type {UserFavoriteDto} from "./UserFavoriteDto";

export interface UserDataContextDto {
    favorites: UserFavoriteDto[];
    setFavorites: React.Dispatch<React.SetStateAction<UserFavoriteDto[]>>;
    toggleFavorite: (targetId: string, targetType: "subject" | "profession" | "channel") => void;
}