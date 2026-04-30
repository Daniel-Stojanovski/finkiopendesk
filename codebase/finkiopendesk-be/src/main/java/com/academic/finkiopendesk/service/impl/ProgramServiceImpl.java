package com.academic.finkiopendesk.service.impl;

import com.academic.finkiopendesk.model.Program;
import com.academic.finkiopendesk.model.dto.ProgramDto;
import com.academic.finkiopendesk.repository.ProgramRepository;
import com.academic.finkiopendesk.service.ProgramService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgramServiceImpl implements ProgramService {

    private final ProgramRepository programRepository;

    public ProgramServiceImpl(ProgramRepository programRepository) {
        this.programRepository = programRepository;
    }

    @Override
    public Program findById(String id) {
        return programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found"));
    }

    @Override
    public List<ProgramDto> findAll() {
        return programRepository.findAll().stream()
                .map(ProgramDto::fromEntity)
                .toList();
    }
}
