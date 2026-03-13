package com.academic.finkiopendesk.model.dto;
import lombok.Data;

import java.util.List;

@Data
public class NotificationGroupDto {

    private String notificationGroupId;

    private String title;

    private long unreadCount;

    private List<NotificationEventDto> events;
}