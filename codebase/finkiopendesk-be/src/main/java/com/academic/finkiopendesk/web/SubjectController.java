package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.SubjectDiscussion;
import com.academic.finkiopendesk.model.Vote;
import com.academic.finkiopendesk.model.dto.*;
import com.academic.finkiopendesk.service.SubjectService;
import com.academic.finkiopendesk.service.VoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/subjects")
public class SubjectController {
    private final SubjectService subjectService;
    private final VoteService voteService;

    public SubjectController(SubjectService subjectService, VoteService voteService) {
        this.subjectService = subjectService;
        this.voteService = voteService;
    }

    @GetMapping
    public List<SubjectDto> getSubjects() {
        return subjectService.findAll().stream()
                .map(SubjectDto::fromEntity)
                .toList();
    }

    @GetMapping("/pid/{professionId}")
    public List<SubjectDto> getSubjectsByProfession(@PathVariable String professionId) {
        return subjectService.findSubjectsByProfessionId(professionId).stream()
                .map(SubjectDto::fromEntity)
                .toList();
    }

    @GetMapping("/sid/{subjectId}")
    public SubjectDiscussionDto getDiscussionBySubjectId(@PathVariable String subjectId) {
        SubjectDiscussion discussion = subjectService.findDiscussionBySubjectId(subjectId);
        return SubjectDiscussionDto.fromEntity(discussion);
    }

    @GetMapping("channels/sid/{subjectId}")
    public List<ChannelDto> getChannelsBySubjectId(@PathVariable String subjectId) {
        return subjectService.findChannelsBySubjectId(subjectId).stream()
                .map(ChannelDto::fromEntity)
                .toList();
    }

    @GetMapping("channels/sid/{subjectId}/active")
    public List<ChannelDto> getActiveChannelsBySubjectId(@PathVariable String subjectId) {
        return subjectService.findActiveChannelsBySubjectId(subjectId).stream()
                .map(ChannelDto::fromEntity)
                .toList();
    }

    @GetMapping("channels/sid/{subjectId}/inactive")
    public List<ChannelDto> getInactiveChannelsBySubjectId(@PathVariable String subjectId) {
        return subjectService.findInactiveChannelsBySubjectId(subjectId).stream()
                .map(ChannelDto::fromEntity)
                .toList();
    }

    @PostMapping("/vote")
    public ResponseEntity<VoteDto> vote(@RequestBody VoteDto voteDto, Authentication authentication) {
        JwtAuthenticationToken token = (JwtAuthenticationToken) authentication;
        String userId = token.getToken().getSubject();

        Vote saved = voteService.vote(voteDto, userId);
        return ResponseEntity.ok(VoteDto.fromEntity(saved));
    }
}