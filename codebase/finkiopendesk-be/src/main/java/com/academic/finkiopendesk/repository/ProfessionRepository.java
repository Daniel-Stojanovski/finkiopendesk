package com.academic.finkiopendesk.repository;

import com.academic.finkiopendesk.model.Profession;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfessionRepository extends JpaSpecificationRepository<Profession, String>{

    @Query("""
        SELECT p
        FROM Profession p
        JOIN p.discussion d
        WHERE d.professionDiscussionId = :discussionId
    """)
    Optional<Profession> findByDiscussionId(String discussionId);
}
