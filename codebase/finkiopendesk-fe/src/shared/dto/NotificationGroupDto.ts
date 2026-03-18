import type {NotificationEventDto} from "./NotificationEventDto";

export interface NotificationGroupDto {
    groupId: string
    userId: string
    type: string
    contextId: string
    title: string
    events: NotificationEventDto[]
}