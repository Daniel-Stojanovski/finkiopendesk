package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.Comment;
import com.academic.finkiopendesk.model.Profession;
import com.academic.finkiopendesk.model.Subject;
import com.academic.finkiopendesk.model.dto.CommentDto;
import com.academic.finkiopendesk.service.CommentService;
import com.academic.finkiopendesk.service.ProfessionService;
import com.academic.finkiopendesk.service.SubjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;
    private final SubjectService subjectService;
    private final ProfessionService professionService;

    public CommentController(CommentService commentService, SubjectService subjectService, ProfessionService professionService) {
        this.commentService = commentService;
        this.subjectService = subjectService;
        this.professionService = professionService;
    }

    @GetMapping
    public List<CommentDto> getComments() {
        return commentService.findAll().stream()
                .map(CommentDto::fromEntity)
                .toList();
    }

    @GetMapping("/sid/{subjectId}")
    public List<CommentDto> getCommentsBySubjectDiscussionId(@PathVariable String subjectId) {
        Subject subject = subjectService.findById(subjectId);
        return commentService.findSubjectDiscussionComments(subject.getDiscussion().getSubjectDiscussionId());
    }

    @GetMapping("/pid/{professionId}")
    public List<CommentDto> getCommentsByProfessionDiscussionId(@PathVariable String professionId) {
        Profession profession = professionService.findById(professionId);
        return commentService.findProfessionDiscussionComments(profession.getDiscussion().getProfessionDiscussionId());
    }

    @PostMapping("/create")
    public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto) {
        Comment comment = CommentDto.toEntity(commentDto);
        Comment saved = commentService.createComment(comment);
        return ResponseEntity.ok(CommentDto.fromEntity(saved));
    }
}
