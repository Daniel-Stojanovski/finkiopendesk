import type { ProfessionDto } from "./ProfessionDto";
import type { SubjectDto } from "./SubjectDto";
import type { ProfessionDiscussionDto } from "./ProfessionDiscussionDto";
import type { SubjectDiscussionDto } from "./SubjectDiscussionDto";

export interface DiscussionObjectDto {
    type: "subject" | "profession";
    object: ProfessionDto | SubjectDto;
    discussion: ProfessionDiscussionDto | SubjectDiscussionDto;
}
