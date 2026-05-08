package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.dto.ProgramSubjectDto;
import com.academic.finkiopendesk.service.ProgramSubjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "https://finkiopendesk.onrender.com")
@RestController
@RequestMapping("/api/program-subjects")
public class ProgramSubjectController {

    private final ProgramSubjectService programSubjectService;

    public ProgramSubjectController(ProgramSubjectService programSubjectService) {
        this.programSubjectService = programSubjectService;
    }

//    @GetMapping("/pid/{professionId}")
//    public List<ProgramSubjectDto> getSubjectsForProfession(
//            @PathVariable String professionId
//    ) {
//        return programSubjectService.getSubjectsForProfession(professionId);
//    }
    @GetMapping("/pid/{professionId}")
    public List<ProgramSubjectDto> getSubjectsForProfession(
            @PathVariable String professionId,
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String program,
            @RequestParam(required = false) String format,
            @RequestParam(required = false) String hardness,
            @RequestParam(required = false) String semesterType
    ) {
        return programSubjectService.getSubjectsForProfessionFiltered(
                professionId,
                query,
                program,
                format,
                hardness,
                semesterType
        );
    }
}