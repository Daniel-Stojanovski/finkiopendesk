package com.academic.finkiopendesk.repository;

import com.academic.finkiopendesk.model.Vote;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface VoteRepository extends JpaSpecificationRepository<Vote, String> {

    @Query("""
        SELECT v
        FROM Vote v
        WHERE v.userId = :userId
        AND v.subjectId = :subjectId
        AND v.professionId = :professionId
    """)
    Optional<Vote> findExact(
            UUID userId,
            String subjectId,
            String professionId
    );

    @Query("""
        SELECT v
        FROM Vote v
        WHERE v.subjectId = :subjectId
        AND v.professionId = :professionId
    """)
    List<Vote> findByProfessionSubject(String professionId, String subjectId);

}