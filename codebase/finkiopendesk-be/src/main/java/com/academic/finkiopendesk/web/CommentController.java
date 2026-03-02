package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.Comment;
import com.academic.finkiopendesk.model.dto.CommentDto;
import com.academic.finkiopendesk.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
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
        Comment saved = commentService.createComment(commentDto);
        return ResponseEntity.ok(CommentDto.fromEntity(saved));
    }
}
