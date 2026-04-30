package com.academic.finkiopendesk.model.dto;

import com.academic.finkiopendesk.model.ProfessionProgram;
import lombok.Data;

@Data
public class ProfessionProgramDto {

    private String professionProgramId;
    private Boolean applicable;

    private ProgramDto program;
    private String professionId;
    private String professionName;

    public static ProfessionProgramDto fromEntity(ProfessionProgram pp) {
        ProfessionProgramDto dto = new ProfessionProgramDto();

        dto.setProfessionProgramId(pp.getProfessionProgramId());
        dto.setApplicable(pp.getApplicable());

        dto.setProgram(
                pp.getProgram() != null
                        ? ProgramDto.fromEntity(pp.getProgram())
                        : null
        );

        dto.setProfessionId(
                pp.getProfession() != null
                        ? pp.getProfession().getProfessionId()
                        : null
        );

        dto.setProfessionName(
                pp.getProfession() != null
                        ? pp.getProfession().getName()
                        : null
        );

        return dto;
    }
}