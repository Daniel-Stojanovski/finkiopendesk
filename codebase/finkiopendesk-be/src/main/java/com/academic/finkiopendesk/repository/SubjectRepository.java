package com.academic.finkiopendesk.repository;

import com.academic.finkiopendesk.model.Subject;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectRepository extends JpaSpecificationRepository<Subject, String>{

    @Query("""
        SELECT s FROM Subject s
        WHERE s.subjectId NOT IN (
            SELECT rs.subjectId
            FROM Profession p
            JOIN p.recommendedSubjects rs
            WHERE p.professionId = :professionId
        )
    """)
    List<Subject> findAllNotRecommendedForProfession(String professionId);

    @Query("""
        SELECT s
        FROM Subject s
        JOIN s.discussion d
        WHERE d.subjectDiscussionId = :discussionId
    """)
    Optional<Subject> findByDiscussionId(String discussionId);
}

