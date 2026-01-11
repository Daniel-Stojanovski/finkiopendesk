package com.academic.finkiopendesk.repository;

import com.academic.finkiopendesk.model.Subject;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository extends JpaSpecificationRepository<Subject, String>{
}
