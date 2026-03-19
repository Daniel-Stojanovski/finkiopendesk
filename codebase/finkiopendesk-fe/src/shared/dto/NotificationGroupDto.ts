import type {NotificationEventDto} from "./NotificationEventDto";

export interface NotificationGroupDto {
    notificationGroupId: string
    userId: string
    type: string
    contextId: string
    title: string
    unreadCount: number
    events: NotificationEventDto[]
}