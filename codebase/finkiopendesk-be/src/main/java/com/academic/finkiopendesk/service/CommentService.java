package com.academic.finkiopendesk.service;

import com.academic.finkiopendesk.model.Comment;
import com.academic.finkiopendesk.model.dto.CommentDto;

public interface CommentService {
    Comment createComment(CommentDto comment);
}