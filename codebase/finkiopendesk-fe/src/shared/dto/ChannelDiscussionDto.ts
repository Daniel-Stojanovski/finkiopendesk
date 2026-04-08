import type { BaseDiscussionDto } from "./BaseDiscussionDto";

export interface ChannelDiscussionDto extends BaseDiscussionDto {
    channelDiscussionId: string;
    channelId: string;
}