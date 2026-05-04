package com.academic.finkiopendesk.service.impl;

import com.academic.finkiopendesk.model.Profession;
import com.academic.finkiopendesk.model.Program;
import com.academic.finkiopendesk.model.ProgramSubject;
import com.academic.finkiopendesk.model.dto.ProgramSubjectDto;
import com.academic.finkiopendesk.model.dto.SubjectDto;
import com.academic.finkiopendesk.repository.ProgramSubjectRepository;
import com.academic.finkiopendesk.service.ProfessionService;
import com.academic.finkiopendesk.service.ProgramSubjectService;
import com.academic.finkiopendesk.repository.specification.ProgramSubjectSpecification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
            dto.setProgramSubjectId(ps.getProgramSubjectId());
            dto.setProgramId(ps.getProgram().getProgramId());
            dto.setProgramName(ps.getProgram().getName());
            dto.setType(ps.getType());
            dto.setSubject(SubjectDto.fromEntity(ps.getSubject()));

            dto.setDependencies(
                    ps.getDependencies().stream()
                            .map(dep -> {
                                ProgramSubjectDto d = new ProgramSubjectDto();
                                d.setProgramSubjectId(dep.getProgramSubjectId());
                                d.setSubject(SubjectDto.fromEntity(dep.getSubject()));
                                return d;
                            })
                            .collect(Collectors.toSet())
            );

            return dto;
        }).toList();
    }

    @Override
    public List<ProgramSubjectDto> getSubjectsForProfessionFiltered(
            String professionId,
            String query,
            String program,
            String format,
            String hardness,
            String semesterType
    ) {

        Profession profession = professionService.findById(professionId);

        List<Program> programs = profession.getApplicablePrograms();

        List<String> programIds = programs.stream()
                .map(Program::getProgramId)
                .toList();

        List<ProgramSubject> relations =
                programSubjectRepository.findAll(
                        ProgramSubjectSpecification.searchAndFilter(
                                programIds,
                                query,
                                program,
                                format,
                                hardness,
                                semesterType
                        )
                );

        return relations.stream().map(ps -> {
            ProgramSubjectDto dto = new ProgramSubjectDto();
            dto.setProgramSubjectId(ps.getProgramSubjectId());
            dto.setProgramId(ps.getProgram().getProgramId());
            dto.setProgramName(ps.getProgram().getName());
            dto.setType(ps.getType());
            dto.setSubject(SubjectDto.fromEntity(ps.getSubject()));

            dto.setDependencies(
                    ps.getDependencies().stream()
                            .map(dep -> {
                                ProgramSubjectDto d = new ProgramSubjectDto();
                                d.setProgramSubjectId(dep.getProgramSubjectId());
                                d.setSubject(SubjectDto.fromEntity(dep.getSubject()));
                                return d;
                            })
                            .collect(Collectors.toSet())
            );

            return dto;
        }).toList();
    }
}
