package com.academic.finkiopendesk.model.dto;

import com.academic.finkiopendesk.model.ProgramSubject;
import com.academic.finkiopendesk.model.enums.ProgramSubjectType;
import lombok.Data;

@Data
public class ProgramSubjectDto {
    private String programSubjectId;
    private String programName;
    private String programId;
    private ProgramSubjectType type; // MANDATORY / ELECTIVE / OTHER
    private SubjectDto subject;

    public static ProgramSubjectDto fromEntity(ProgramSubject ps) {
        ProgramSubjectDto dto = new ProgramSubjectDto();
        dto.setProgramSubjectId(ps.getProgramSubjectId());
        dto.setProgramName(ps.getProgram().getName());
        dto.setProgramId(ps.getProgram().getProgramId());
        dto.setType(ps.getType());
        dto.setSubject(SubjectDto.fromEntity(ps.getSubject()));

        return dto;
    }
}