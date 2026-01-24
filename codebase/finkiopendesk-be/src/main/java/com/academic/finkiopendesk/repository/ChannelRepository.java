package com.academic.finkiopendesk.repository;

import com.academic.finkiopendesk.model.Channel;
import org.springframework.stereotype.Repository;

@Repository
public interface ChannelRepository extends JpaSpecificationRepository<Channel, String>{
}
