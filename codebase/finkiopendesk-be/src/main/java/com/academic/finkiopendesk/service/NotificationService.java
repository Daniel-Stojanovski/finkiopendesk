package com.academic.finkiopendesk.service;

import com.academic.finkiopendesk.model.Comment;
import com.academic.finkiopendesk.model.NotificationGroup;
import com.academic.finkiopendesk.model.dto.NotificationGroupDto;

import java.util.List;
import java.util.UUID;

public interface NotificationService {

    List<NotificationGroup> findAllNotifications();
    List<NotificationGroupDto> findNotificationsByUserId(UUID userId);

    void createDiscussionNotification(
            UUID receiverId,
            UUID initiatorId,
            String discussionId,
            String title,
            String type,
            String message,
            String targetObjectId
    );

    void markEventRead(String eventId);
    void markGroupRead(String groupId);

    void sendNotification(Comment comment);
}
