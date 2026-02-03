import type {UserDto} from "./UserDto";

export interface AuthContextDto {
    user: UserDto | null;
    fetchUser: () => Promise<void>;
    logout: () => void;
}