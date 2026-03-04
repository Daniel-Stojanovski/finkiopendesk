package com.academic.finkiopendesk.service;

import com.academic.finkiopendesk.model.Comment;
import com.academic.finkiopendesk.model.dto.CommentDto;

import java.util.List;

public interface CommentService {
    List<Comment> findAll();
    Comment findById(String id);
    List<CommentDto> findSubjectDiscussionComments(String subjectDiscussionId);
    List<CommentDto> findProfessionDiscussionComments(String professionDiscussionId);
    Comment createComment(CommentDto comment, String userId);
}