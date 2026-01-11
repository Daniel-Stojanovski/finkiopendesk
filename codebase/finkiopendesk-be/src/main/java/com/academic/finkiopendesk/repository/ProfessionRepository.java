package com.academic.finkiopendesk.repository;

import com.academic.finkiopendesk.model.Profession;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfessionRepository extends JpaSpecificationRepository<Profession, String>{
}
