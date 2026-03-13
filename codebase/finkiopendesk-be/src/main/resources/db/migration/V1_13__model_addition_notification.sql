CREATE TABLE notification_group (
    notification_group_id VARCHAR(255) NOT NULL DEFAULT gen_random_uuid()::text,
    user_id UUID NOT NULL,
    type VARCHAR(255) NOT NULL,
    context_id VARCHAR(255) NOT NULL,
    title TEXT,

    CONSTRAINT pk_notification_group PRIMARY KEY (notification_group_id),

    CONSTRAINT uc_notification_group_group_id UNIQUE (notification_group_id)
);

CREATE TABLE notification_event (
    notification_event_id VARCHAR(255) NOT NULL DEFAULT gen_random_uuid()::text,
    notification_group_id VARCHAR(255) NOT NULL,
    initiator_id UUID NOT NULL,
    type VARCHAR(225),
    message TEXT,
    target_object_id VARCHAR(225),
    status_read BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT pk_notification_event PRIMARY KEY (notification_event_id),

    CONSTRAINT fk_event_notification_group
        FOREIGN KEY (notification_group_id)
            REFERENCES notification_group(notification_group_id),

    CONSTRAINT uc_notification_event_event_id UNIQUE (notification_event_id)
);