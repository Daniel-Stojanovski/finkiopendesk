import type {ProfessionDiscussionDto} from "./ProfessionDiscussionDto";

export interface ProfessionDto {
    professionId: string;
    name: string;
    alternativeName?: string;
    description?: string;
    discussion: ProfessionDiscussionDto;
}