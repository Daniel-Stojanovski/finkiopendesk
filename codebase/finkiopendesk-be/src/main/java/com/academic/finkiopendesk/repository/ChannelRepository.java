package com.academic.finkiopendesk.repository;

import com.academic.finkiopendesk.model.Channel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChannelRepository extends JpaSpecificationRepository<Channel, String>{

    @Query("SELECT c FROM Channel c WHERE c.subjectTag.status = TRUE")
    List<Channel> findActiveChannels();

    @Query("SELECT c FROM Channel c WHERE c.subjectTag.status = FALSE")
    List<Channel> findInactiveChannels();
}
