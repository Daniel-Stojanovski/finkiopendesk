package com.academic.finkiopendesk.model.dto;
import com.academic.finkiopendesk.model.NotificationGroup;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class NotificationGroupDto {
    private String notificationGroupId;
    private String title;
    private long unreadCount;
    private List<NotificationEventDto> events;

    public static NotificationGroupDto fromEntity(NotificationGroup group) {
        NotificationGroupDto dto = new NotificationGroupDto();
        dto.setTitle(group.getTitle());
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
                        .collect(Collectors.toList())
        );

        return dto;
    }
}