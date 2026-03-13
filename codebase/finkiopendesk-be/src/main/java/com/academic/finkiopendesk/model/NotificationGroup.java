package com.academic.finkiopendesk.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "notification_group")
@Data
public class NotificationGroup {

    @Id
    @Column(name = "notification_group_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    @JsonProperty("notificationGroupId")
    private String notificationGroupId;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(nullable = false)
    private String type;

    @Column(name = "context_id", nullable = false)
    private String contextId;

    private String title;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<NotificationEvent> events;
}