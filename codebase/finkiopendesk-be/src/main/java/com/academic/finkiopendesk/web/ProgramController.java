package com.academic.finkiopendesk.web;

import com.academic.finkiopendesk.model.dto.ProgramDto;
import com.academic.finkiopendesk.service.ProgramService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/program")
public class ProgramController {

    private final ProgramService programService;

    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }

    @GetMapping
    public List<ProgramDto> getAllPrograms() {
        return programService.findAll();
    }
}
