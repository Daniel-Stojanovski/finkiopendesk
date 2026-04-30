package com.academic.finkiopendesk.model.dto;

import com.academic.finkiopendesk.model.Program;
import lombok.Data;

@Data
public class ProgramDto {

    private String programId;
    private String name;
    private String fullName;
    private String aliasFullNameEn;
    private String description;

    public static ProgramDto fromEntity(Program program) {
        ProgramDto dto = new ProgramDto();
        dto.setProgramId(program.getProgramId());
        dto.setName(program.getName());
        dto.setFullName(program.getFullName());
        dto.setAliasFullNameEn(program.getAliasFullNameEn());
        dto.setDescription(program.getDescription());
        return dto;
    }
}