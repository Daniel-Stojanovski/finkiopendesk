package com.academic.finkiopendesk.repository;

import com.academic.finkiopendesk.model.NotificationEvent;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationEventRepository extends JpaSpecificationRepository<NotificationEvent, String> {

    @Query("""
        SELECT COUNT(e)
        FROM NotificationEvent e
            WHERE e.group.notificationGroupId = :groupId
            AND e.statusRead = false
    """)
    long countUnread(String groupId);
}