import type { ProfessionDto } from "./ProfessionDto";
import type { SubjectDto } from "./SubjectDto";
import type { ProfessionDiscussionDto } from "./ProfessionDiscussionDto";
import type { SubjectDiscussionDto } from "./SubjectDiscussionDto";

export type DiscussionObjectDto = {
    type: "profession";
    object: ProfessionDto;
    discussion: ProfessionDiscussionDto;
    } | {
    type: "subject";
    object: SubjectDto;
    discussion: SubjectDiscussionDto;
    };
