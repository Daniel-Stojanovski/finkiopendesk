package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.Comment;
import com.academic.finkiopendesk.model.dto.CommentDto;
import com.academic.finkiopendesk.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public List<CommentDto> getComments() {
        return commentService.findAll().stream()
                .map(CommentDto::fromEntity)
                .toList();
    }

    @GetMapping("/sid/{subjectDiscussionId}")
    public List<Comment> getCommentsBySubjectDiscussionId(@PathVariable String subjectDiscussionId) {
        return commentService.findSubjectDiscussionComments(subjectDiscussionId);
    }

    @GetMapping("/pid/{professionDiscussionId}")
    public List<Comment> getCommentsByProfessionDiscussionId(@PathVariable String professionDiscussionId) {
        return commentService.findProfessionDiscussionComments(professionDiscussionId);
    }

    @PostMapping("/create")
    public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto) {
        Comment comment = CommentDto.toEntity(commentDto);
        Comment saved = commentService.createComment(comment);
        return ResponseEntity.ok(CommentDto.fromEntity(saved));
    }
}
