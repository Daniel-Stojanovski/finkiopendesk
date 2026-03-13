package com.academic.finkiopendesk.model.dto;

import lombok.Data;

@Data
public class NotificationEventDto {

    private String notificationEventId;

    private String message;

    private boolean statusRead;

    private String targetObjectId;
}