package com.academic.finkiopendesk.service.impl;

import com.academic.finkiopendesk.model.Comment;
import com.academic.finkiopendesk.model.NotificationEvent;
import com.academic.finkiopendesk.model.NotificationGroup;
import com.academic.finkiopendesk.repository.NotificationEventRepository;
import com.academic.finkiopendesk.repository.NotificationGroupRepository;
import com.academic.finkiopendesk.service.CommentService;
import com.academic.finkiopendesk.service.NotificationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationGroupRepository groupRepository;
    private final NotificationEventRepository eventRepository;
    private final CommentService commentService;

    public NotificationServiceImpl(NotificationGroupRepository groupRepository, NotificationEventRepository eventRepository, CommentService commentService) {
        this.groupRepository = groupRepository;
        this.eventRepository = eventRepository;
        this.commentService = commentService;
    }

    @Override
    public void createDiscussionNotification(
            UUID receiverId,
            UUID initiatorId,
            String discussionId,
            String message,
            String targetObjectId
    ) {

        NotificationGroup group = groupRepository
                .findByUserIdAndContextIdAndType(receiverId, discussionId, "DISCUSSION")
                .orElseGet(() -> {
                    NotificationGroup g = new NotificationGroup();
//                    g.setNotificationGroupId(UUID.randomUUID().toString());
                    g.setUserId(receiverId);
                    g.setType("DISCUSSION");
                    g.setContextId(discussionId);
                    g.setTitle("Discussion");

                    return groupRepository.save(g);
                });

        NotificationEvent event = new NotificationEvent();
//        event.setNotificationEventId(UUID.randomUUID().toString());
        event.setGroup(group);
        event.setInitiatorId(initiatorId);
        event.setType("REPLY");
        event.setMessage(message);
        event.setTargetObjectId(targetObjectId);
        event.setStatusRead(false);

        eventRepository.save(event);
    }

    @Override
    public void markEventRead(String eventId) {
        NotificationEvent event = eventRepository
                .findById(eventId)
                .orElseThrow();

        event.setStatusRead(true);

        eventRepository.save(event);
    }

    @Override
    @Transactional
    public void markGroupRead(String groupId) {
        NotificationGroup group = groupRepository
                .findById(groupId)
                .orElseThrow();

        group.getEvents().forEach(e -> e.setStatusRead(true));
    }

    @Override
    public void sendNotification(Comment comment) {

        String discussionType;
        String discussionId;

        if (comment.getChannel() != null) {
            discussionType = "CHANNEL";
            discussionId = comment.getChannel().getChannelId();
        } else if (comment.getSubjectDiscussion() != null) {
            discussionType = "SUBJECT";
            discussionId = comment.getSubjectDiscussion().getSubjectDiscussionId();
        } else if (comment.getProfessionDiscussion() != null) {
            discussionType = "PROFESSION";
            discussionId = comment.getProfessionDiscussion().getProfessionDiscussionId();
        } else {
            throw new IllegalStateException("Comment has no discussion context");
        }

        String contextKey = "DISCUSSION:" + discussionType + ":" + discussionId;

        if (comment.getParentComment() != null) {
            UUID receiverId = comment.getParentComment().getUser().getUserId();
            if (!receiverId.equals(comment.getUser().getUserId())) {
                createDiscussionNotification(
                        receiverId,
                        comment.getUser().getUserId(),
                        contextKey,
                        comment.getUser().getEmail() + " replied to your comment",
                        comment.getCommentId()
                );
            }
        } else {
            List<Comment> previousComments = commentService.findCommentsByDiscussionContext(
                    comment.getChannel().getChannelId(),
                    comment.getSubjectDiscussion().getSubjectDiscussionId(),
                    comment.getProfessionDiscussion().getProfessionDiscussionId()
            );

            previousComments.stream()
                    .map(c -> c.getUser().getUserId())
                    .filter(userId -> !userId.equals(comment.getUser().getUserId()))
                    .distinct()
                    .forEach(receiverId -> createDiscussionNotification(
                            receiverId,
                            comment.getUser().getUserId(),
                            contextKey,
                            comment.getUser().getEmail() + " commented in a discussion you participated in",
                            comment.getCommentId()
                    ));
        }
    }

}

