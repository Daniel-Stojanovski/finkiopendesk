package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.Profession;
import com.academic.finkiopendesk.model.ProfessionDiscussion;
import com.academic.finkiopendesk.service.ProfessionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/professions")
public class ProfessionController {

    private final ProfessionService professionService;

    public ProfessionController(ProfessionService professionService) {
        this.professionService = professionService;
    }

    @GetMapping
    public List<Profession> getProfessions() {
        return professionService.findAll();
    }

    @GetMapping("/pid/{professionId}")
    public ProfessionDiscussion getDiscussionBySubjectId(@PathVariable String professionId) {
        return professionService.findDiscussionByProfessionId(professionId);
    }

}
