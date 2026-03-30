package com.academic.finkiopendesk.repository;

import com.academic.finkiopendesk.model.Vote;
import com.academic.finkiopendesk.web.dto.UserVoteProjection;
import com.academic.finkiopendesk.web.dto.VotesCountProjection;
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
        SELECT s.subjectId AS subjectId,
               COALESCE(SUM(v.vote), 0) AS voteCount
        FROM Subject s
        LEFT JOIN Vote v
            ON v.subjectId = s.subjectId
            AND v.professionId = :professionId
        GROUP BY s.subjectId
    """)
    List<VotesCountProjection> findByProfessionSubject(String professionId);

    @Query("""
        SELECT s.subjectId AS subjectId,
               v.vote AS vote
        FROM Subject s
        LEFT JOIN Vote v
            ON v.subjectId = s.subjectId
            AND v.professionId = :professionId
            AND v.userId = :userId
    """)
    List<UserVoteProjection> findByProfessionSubjectAndUser(String professionId, UUID userId);

    List<Vote> findByUserId(UUID userId);
}