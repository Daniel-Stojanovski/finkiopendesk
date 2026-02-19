package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.SubjectDiscussion;
import com.academic.finkiopendesk.model.dto.ChannelDto;
import com.academic.finkiopendesk.model.dto.SubjectDiscussionDto;
import com.academic.finkiopendesk.model.dto.SubjectDto;
import com.academic.finkiopendesk.service.SubjectService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
public class SubjectController {
    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
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
}