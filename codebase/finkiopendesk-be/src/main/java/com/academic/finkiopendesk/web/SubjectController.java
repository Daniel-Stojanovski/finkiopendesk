package com.academic.finkiopendesk.web;


import com.academic.finkiopendesk.model.Subject;
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
}