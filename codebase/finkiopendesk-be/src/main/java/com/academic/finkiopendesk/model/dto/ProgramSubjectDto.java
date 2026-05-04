package com.academic.finkiopendesk.model.dto;

import com.academic.finkiopendesk.model.ProgramSubject;
import com.academic.finkiopendesk.model.enums.ProgramSubjectType;
import lombok.Data;

import java.util.Set;
import java.util.stream.Collectors;

@Data
public class ProgramSubjectDto {
    private String programSubjectId;
    private String programName;
    private String programId;
    private ProgramSubjectType type; // MANDATORY / ELECTIVE / OTHER
    private SubjectDto subject;
    private Set<ProgramSubjectDto> dependencies;

    public static ProgramSubjectDto fromEntity(ProgramSubject ps) {
        ProgramSubjectDto dto = new ProgramSubjectDto();
        dto.setProgramSubjectId(ps.getProgramSubjectId());
        dto.setProgramName(ps.getProgram().getName());
        dto.setProgramId(ps.getProgram().getProgramId());
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

        System.out.println("PS " + ps.getProgramSubjectId() + " deps size: " + ps.getDependencies().size());

        return dto;
    }
}