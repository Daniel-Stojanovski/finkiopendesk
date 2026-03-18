export interface NotificationEventDto {
    eventId: string
    initiatorId: string
    type: string
    message: string
    targetObjectId: string
    statusRead: boolean
}