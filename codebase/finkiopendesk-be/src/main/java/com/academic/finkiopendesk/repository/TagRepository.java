package com.academic.finkiopendesk.repository;

import com.academic.finkiopendesk.model.Tag;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaSpecificationRepository<Tag, String>{
}
