package com.academic.finkiopendesk.repository;

import com.academic.finkiopendesk.model.NotificationGroup;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface NotificationGroupRepository extends JpaSpecificationRepository<NotificationGroup, String> {

    List<NotificationGroup> findByUserId(UUID userId);
    Optional<NotificationGroup> findByUserIdAndContextIdAndType(UUID userId, String contextId, String type);
}