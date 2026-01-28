import type {BaseDiscussionDto} from "./BaseDiscussionDto";

export interface ProfessionDiscussionDto extends BaseDiscussionDto {
    professionDiscussionId: string;
    professionId: string;
}