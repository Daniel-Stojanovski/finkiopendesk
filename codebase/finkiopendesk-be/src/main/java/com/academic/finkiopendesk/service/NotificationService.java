package com.academic.finkiopendesk.service;

import com.academic.finkiopendesk.model.Comment;

import java.util.UUID;

public interface NotificationService {
    void createDiscussionNotification(
            UUID receiverId,
            UUID initiatorId,
            String discussionId,
            String message,
            String targetObjectId
    );

    void markEventRead(String eventId);
    void markGroupRead(String groupId);

    void sendNotification(Comment comment);
}
