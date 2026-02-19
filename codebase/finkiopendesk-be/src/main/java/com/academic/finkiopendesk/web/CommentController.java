package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.Comment;
import com.academic.finkiopendesk.model.dto.CommentDto;
import com.academic.finkiopendesk.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/create")
    public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto) {
        Comment comment = CommentDto.toEntity(commentDto);
        Comment saved = commentService.createComment(comment);
        return ResponseEntity.ok(CommentDto.fromEntity(saved));
    }
}
