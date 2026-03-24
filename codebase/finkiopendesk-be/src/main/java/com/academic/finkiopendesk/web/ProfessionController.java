package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.Profession;
import com.academic.finkiopendesk.model.ProfessionDiscussion;
import com.academic.finkiopendesk.model.dto.ProfessionDiscussionDto;
import com.academic.finkiopendesk.model.dto.ProfessionDto;
import com.academic.finkiopendesk.service.ProfessionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/professions")
public class ProfessionController {

    private final ProfessionService professionService;

    public ProfessionController(ProfessionService professionService) {
        this.professionService = professionService;
    }

    @GetMapping
    public List<ProfessionDto> getProfessions(@RequestParam(required = false) String query) {
        if (query == null || query.isBlank()) {
            return professionService.findAll().stream()
                    .map(ProfessionDto::fromEntity)
                    .toList();
        }
        return professionService.findAll(query).stream()
                .map(ProfessionDto::fromEntity)
                .toList();
    }

    @GetMapping("/{professionId}")
    public ProfessionDto getById(@PathVariable String professionId) {
        Profession profession = professionService.findById(professionId);
        return ProfessionDto.fromEntity(profession);
    }

    @GetMapping("/pid/{professionId}")
    public ProfessionDiscussionDto getDiscussionByProfessionId(@PathVariable String professionId) {
        ProfessionDiscussion discussion = professionService.findDiscussionByProfessionId(professionId);
        return ProfessionDiscussionDto.fromEntity(discussion);
    }
}
