package com.academic.finkiopendesk.service.impl;

import com.academic.finkiopendesk.model.dto.ProfessionProgramDto;
import com.academic.finkiopendesk.repository.ProfessionProgramRepository;
import com.academic.finkiopendesk.service.ProfessionProgramService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessionProgramServiceImpl implements ProfessionProgramService {

    private final ProfessionProgramRepository professionProgramRepository;

    public ProfessionProgramServiceImpl(ProfessionProgramRepository professionProgramRepository) {
        this.professionProgramRepository = professionProgramRepository;
    }

    public List<ProfessionProgramDto> getAllByProfession(String professionId) {
        return professionProgramRepository.findByProfession(professionId)
                .stream()
                .map(ProfessionProgramDto::fromEntity)
                .toList();
    }

    public List<ProfessionProgramDto> findApplicableProgramsInProfession(String professionId) {
        return professionProgramRepository.findApplicableProgramsInProfession(professionId)
                .stream()
                .map(ProfessionProgramDto::fromEntity)
                .toList();
    }

    public List<ProfessionProgramDto> findCoveredProfessionsInProgram(String programId) {
        return professionProgramRepository.findCoveredProfessionsInProgram(programId)
                .stream()
                .map(ProfessionProgramDto::fromEntity)
                .toList();
    }
}
