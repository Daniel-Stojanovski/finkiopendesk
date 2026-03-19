export interface NotificationEventDto {
    notificationEventId: string
    initiatorId: string
    type: string
    message: string
    targetObjectId: string
    statusRead: boolean

    contextId: string
    groupType: string
}