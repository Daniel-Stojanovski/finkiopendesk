package com.academic.finkiopendesk.repository;

import com.academic.finkiopendesk.model.Comment;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaSpecificationRepository<Comment, String> {
}