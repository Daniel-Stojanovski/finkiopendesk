package com.academic.finkiopendesk.service;

import com.academic.finkiopendesk.model.Comment;
import com.academic.finkiopendesk.model.dto.CommentDto;

import java.util.List;

public interface CommentService {
    List<Comment> findAll();
    List<Comment> findSubjectDiscussionComments(String subjectDiscussionId);
    List<Comment> findProfessionDiscussionComments(String professionDiscussionId);
    Comment createComment(CommentDto comment);
}