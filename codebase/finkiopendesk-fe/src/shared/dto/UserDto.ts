import type {ProgramDto} from "./ProgramDto";

export interface UserDto {
    userId: string;
    email: string;
    student: boolean;
    selectedProgram: ProgramDto;
}