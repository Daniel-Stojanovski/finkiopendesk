package com.academic.finkiopendesk.model.dto;

import com.academic.finkiopendesk.model.NotificationGroup;
import lombok.Data;

import java.util.List;

@Data
public class NotificationGroupDto {
    private String notificationGroupId;
    private String title;
    private long unreadCount;

    private String type;
    private String contextId;

    private List<NotificationEventDto> events;

    public static NotificationGroupDto fromEntity(NotificationGroup group) {
        NotificationGroupDto dto = new NotificationGroupDto();

        dto.setNotificationGroupId(group.getNotificationGroupId());
        dto.setTitle(group.getTitle());

        dto.setType(group.getType());
        dto.setContextId(group.getContextId());

        dto.setUnreadCount(
                group.getEvents()
                        .stream()
                        .filter(e -> !e.isStatusRead())
                        .count()
        );

        dto.setEvents(
                group.getEvents()
                        .stream()
                        .map(NotificationEventDto::fromEntity)
                        .toList()
        );

        return dto;
    }
}