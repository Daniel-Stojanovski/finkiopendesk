package com.academic.finkiopendesk.model.dto;

import com.academic.finkiopendesk.model.NotificationEvent;
import lombok.Data;

@Data
public class NotificationEventDto {
    private String notificationEventId;
    private String message;
    private boolean statusRead;
    private String targetObjectId;

    public static NotificationEventDto fromEntity(NotificationEvent event){
        NotificationEventDto dto = new NotificationEventDto();
        dto.setMessage(event.getMessage());
        dto.setStatusRead(event.isStatusRead());
        dto.setTargetObjectId(event.getTargetObjectId());

        return dto;
    }
}