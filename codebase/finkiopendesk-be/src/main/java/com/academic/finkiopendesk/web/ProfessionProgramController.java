package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.dto.ProfessionProgramDto;
import com.academic.finkiopendesk.service.ProfessionProgramService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/profession-program")
public class ProfessionProgramController {

    private final ProfessionProgramService professionProgramService;

    public ProfessionProgramController(ProfessionProgramService professionProgramService) {
        this.professionProgramService = professionProgramService;
    }

    @GetMapping("/pid/{id}")
    public List<ProfessionProgramDto> getAllByProfession(@PathVariable String id) {
        return professionProgramService.getAllByProfession(id);
    }

    @GetMapping("/pid/{id}/applicable")
    public List<ProfessionProgramDto> getApplicableByProfession(@PathVariable String id) {
        return professionProgramService.findApplicableProgramsInProfession(id);
    }

    @GetMapping("/ppid/{id}/applicable")
    public List<ProfessionProgramDto> getApplicableByProgram(@PathVariable String id) {
        return professionProgramService.findCoveredProfessionsInProgram(id);
    }
}
