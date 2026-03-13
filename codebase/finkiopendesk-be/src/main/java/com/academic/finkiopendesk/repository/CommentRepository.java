package com.academic.finkiopendesk.repository;

import com.academic.finkiopendesk.model.Comment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaSpecificationRepository<Comment, String> {

    @Query("""
        SELECT c
        FROM Comment c
        WHERE (:channelId IS NULL OR c.channel.channelId = :channelId)
          AND (:subjectDiscussionId IS NULL OR c.subjectDiscussion.subjectDiscussionId = :subjectDiscussionId)
          AND (:professionDiscussionId IS NULL OR c.professionDiscussion.professionDiscussionId = :professionDiscussionId)
    """)
    List<Comment> findCommentsByDiscussionContext(
            @Param("channelId") String channelId,
            @Param("subjectDiscussionId") String subjectDiscussionId,
            @Param("professionDiscussionId") String professionDiscussionId
    );
}