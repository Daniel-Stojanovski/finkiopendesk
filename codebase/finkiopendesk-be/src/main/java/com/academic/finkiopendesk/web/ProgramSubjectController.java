package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.dto.ProgramSubjectDto;
import com.academic.finkiopendesk.service.ProgramSubjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/program-subjects")
public class ProgramSubjectController {

    private final ProgramSubjectService programSubjectService;

    public ProgramSubjectController(ProgramSubjectService programSubjectService) {
        this.programSubjectService = programSubjectService;
    }

    @GetMapping("/pid/{professionId}")
    public List<ProgramSubjectDto> getSubjectsForProfession(
            @PathVariable String professionId
    ) {
        return programSubjectService.getSubjectsForProfession(professionId);
    }
}