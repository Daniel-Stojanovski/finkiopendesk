import type {ProgramDto} from "./ProgramDto";

export interface ProfessionProgramDto {
    professionId: string;
    professionName: string;
    program: ProgramDto;
    applicable: boolean;
}