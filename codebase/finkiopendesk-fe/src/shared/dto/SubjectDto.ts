import type {SubjectDiscussionDto} from "./SubjectDiscussionDto";
import type {SubjectTagDto} from "./SubjectTagDto";

export interface SubjectDto {
    subjectId: string;
    name: string;
    description?: string;
    discussion: SubjectDiscussionDto;
    tags?: SubjectTagDto[];
}