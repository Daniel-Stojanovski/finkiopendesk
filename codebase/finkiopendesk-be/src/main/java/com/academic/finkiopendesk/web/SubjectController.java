package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.Channel;
import com.academic.finkiopendesk.model.Subject;
import com.academic.finkiopendesk.model.SubjectDiscussion;
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
    public List<Subject> getSubjects() {
        return subjectService.findAll();
    }

    @GetMapping("/pid/{professionId}")
    public List<Subject> getSubjectsByProfession(@PathVariable String professionId) {
        return subjectService.findSubjectsByProfessionId(professionId);
    }

    @GetMapping("/sid/{subjectId}")
    public SubjectDiscussion getDiscussionBySubjectId(@PathVariable String subjectId) {
        return subjectService.findDiscussionBySubjectId(subjectId);
    }

    @GetMapping("channels/sid/{subjectId}")
    public List<Channel> getChannelsBySubjectId(@PathVariable String subjectId) {
        return subjectService.findChannelsBySubjectId(subjectId);
    }

    @GetMapping("channels/sid/{subjectId}/active")
    public List<Channel> getActiveChannelsBySubjectId(@PathVariable String subjectId) {
        return subjectService.findActiveChannelsBySubjectId(subjectId);
    }

    @GetMapping("channels/sid/{subjectId}/inactive")
    public List<Channel> getInactiveChannelsBySubjectId(@PathVariable String subjectId) {
        return subjectService.findInactiveChannelsBySubjectId(subjectId);
    }
}