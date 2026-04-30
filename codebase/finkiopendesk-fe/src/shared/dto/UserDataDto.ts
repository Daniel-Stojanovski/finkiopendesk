import type {UserFavoriteDto} from "./UserFavoriteDto";
import type {ProgramDto} from "./ProgramDto";

export interface UserDataContextDto {
    favorites: UserFavoriteDto[];
    setFavorites: React.Dispatch<React.SetStateAction<UserFavoriteDto[]>>;
    toggleFavorite: (targetId: string, targetType: "subject" | "profession" | "channel") => void;

    selectedUserProgram: ProgramDto | null;
    setUserProgram: (program: ProgramDto | null) => Promise<void>;
}