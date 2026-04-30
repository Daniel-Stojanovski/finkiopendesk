import type {ProfessionDiscussionDto} from "./ProfessionDiscussionDto";
import type {SubjectDto} from "./SubjectDto";
import type {ProgramDto} from "./ProgramDto";

export interface ProfessionDto {
    professionId: string;
    name: string;
    alternativeName: string | null;
    description: string | null;
    discussion: ProfessionDiscussionDto;
    recommendedSubjects?: SubjectDto[];
    programs?: ProgramDto[];
}