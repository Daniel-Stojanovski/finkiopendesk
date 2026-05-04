import type {SubjectDto} from "./SubjectDto";

export interface ProgramSubjectDto {
    programSubjectId: string;
    programId: string;
    programName: string;
    type: "MANDATORY" | "ELECTIVE" | "OTHER";
    subject: SubjectDto;
    dependencies: ProgramSubjectDto[];
}