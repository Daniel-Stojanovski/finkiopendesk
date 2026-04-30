package com.academic.finkiopendesk.repository;

import com.academic.finkiopendesk.model.Program;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgramRepository extends JpaSpecificationRepository<Program, String>{
}
