package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.ProfessionDiscussion;
import com.academic.finkiopendesk.model.dto.ProfessionDiscussionDto;
import com.academic.finkiopendesk.model.dto.ProfessionDto;
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
    public List<ProfessionDto> getProfessions() {
        return professionService.findAll().stream()
                .map(ProfessionDto::fromEntity)
                .toList();
    }

    @GetMapping("/pid/{professionId}")
    public ProfessionDiscussionDto getDiscussionByProfessionId(@PathVariable String professionId) {
        ProfessionDiscussion discussion = professionService.findDiscussionByProfessionId(professionId);
        return ProfessionDiscussionDto.fromEntity(discussion);
    }
}
