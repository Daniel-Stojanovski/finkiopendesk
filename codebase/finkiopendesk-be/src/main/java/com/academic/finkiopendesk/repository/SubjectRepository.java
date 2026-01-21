package com.academic.finkiopendesk.repository;

import com.academic.finkiopendesk.model.Subject;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

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
}

