package com.academic.finkiopendesk.service;

import com.academic.finkiopendesk.model.dto.ProfessionProgramDto;

import java.util.List;

public interface ProfessionProgramService {

    List<ProfessionProgramDto> getAllByProfession(String professionId);
    List<ProfessionProgramDto> findApplicableProgramsInProfession(String professionId);
    List<ProfessionProgramDto> findCoveredProfessionsInProgram(String programId);
}
