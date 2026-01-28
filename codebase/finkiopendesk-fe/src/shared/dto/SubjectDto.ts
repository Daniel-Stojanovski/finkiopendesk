import type {SubjectDiscussionDto} from "./SubjectDiscussionDto";

export interface SubjectDto {
    subjectId: string;
    name: string;
    description?: string;
    discussion: SubjectDiscussionDto;
}