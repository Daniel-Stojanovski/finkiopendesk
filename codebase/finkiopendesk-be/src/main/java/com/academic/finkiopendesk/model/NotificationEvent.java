package com.academic.finkiopendesk.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;


import java.util.UUID;

@Entity
@Table(name = "notification_event")
@Data
public class NotificationEvent {

    @Id
    @Column(name = "notification_event_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    @JsonProperty("notificationEventId")
    private String notificationEventId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notification_group_id", nullable = false)
    private NotificationGroup group;

    @Column(name = "initiator_id", nullable = false)
    private UUID initiatorId;

    private String type;

    private String message;

    @Column(name = "target_object_id")
    private String targetObjectId;

    @Column(name = "status_read", nullable = false)
    private boolean statusRead;
}