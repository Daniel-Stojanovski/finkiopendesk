package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.Comment;
import com.academic.finkiopendesk.model.dto.CommentDto;
import com.academic.finkiopendesk.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/create")
    public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto) {
        Comment saved = commentService.createComment(commentDto);
        return ResponseEntity.ok(CommentDto.fromEntity(saved));
    }
}
