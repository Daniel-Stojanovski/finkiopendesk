package com.academic.finkiopendesk.service.impl;

import com.academic.finkiopendesk.model.Profession;
import com.academic.finkiopendesk.model.Program;
import com.academic.finkiopendesk.model.ProgramSubject;
import com.academic.finkiopendesk.model.dto.ProgramDto;
import com.academic.finkiopendesk.model.dto.ProgramSubjectDto;
import com.academic.finkiopendesk.model.dto.SubjectDto;
import com.academic.finkiopendesk.repository.ProgramSubjectRepository;
import com.academic.finkiopendesk.service.ProfessionService;
import com.academic.finkiopendesk.service.ProgramSubjectService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgramSubjectServiceImpl implements ProgramSubjectService {

    private final ProgramSubjectRepository programSubjectRepository;
    private final ProfessionService professionService;

    public ProgramSubjectServiceImpl(ProgramSubjectRepository programSubjectRepository, ProfessionService professionService) {
        this.programSubjectRepository = programSubjectRepository;
        this.professionService = professionService;
    }

    public List<ProgramSubjectDto> getSubjectsForProfession(String professionId) {

        Profession profession = professionService.findById(professionId);

        List<Program> programs = profession.getApplicablePrograms();

        List<String> programIds = programs.stream()
                .map(Program::getProgramId)
                .toList();

        List<ProgramSubject> relations =
                programSubjectRepository.findWithProgramIds(programIds);

        return relations.stream().map(ps -> {
            ProgramSubjectDto dto = new ProgramSubjectDto();

            dto.setProgramId(ps.getProgram().getProgramId());
            dto.setProgramName(ps.getProgram().getName());
            dto.setType(ps.getType());
            dto.setSubject(SubjectDto.fromEntity(ps.getSubject()));

            return dto;
        }).toList();
    }
}
