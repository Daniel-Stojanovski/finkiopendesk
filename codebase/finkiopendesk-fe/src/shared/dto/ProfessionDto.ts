import type {ProfessionDiscussionDto} from "./ProfessionDiscussionDto";
import type {SubjectDto} from "./SubjectDto";

export interface ProfessionDto {
    professionId: string;
    name: string;
    alternativeName?: string;
    description?: string;
    discussion: ProfessionDiscussionDto;
    recommendedSubjects?: SubjectDto[];
}