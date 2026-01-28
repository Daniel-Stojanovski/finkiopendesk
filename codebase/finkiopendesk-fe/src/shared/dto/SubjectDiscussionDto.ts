import type { BaseDiscussionDto } from "./BaseDiscussionDto";

export interface SubjectDiscussionDto extends BaseDiscussionDto {
    subjectDiscussionId: string;
    subjectId: string;
}