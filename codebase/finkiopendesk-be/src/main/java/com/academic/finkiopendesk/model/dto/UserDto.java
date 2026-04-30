package com.academic.finkiopendesk.model.dto;

import com.academic.finkiopendesk.model.Program;
import com.academic.finkiopendesk.model.User;
import lombok.Data;

import java.util.UUID;

@Data
public class UserDto {
    UUID userId;
    String email;
    boolean student;

//    ProgramDto selectedProgram;
    public String selectedProgramId;
    public String selectedProgramName;

    public static UserDto fromEntity(User user) {
        UserDto dto = new UserDto();
        dto.setUserId(user.getUserId());
        dto.setEmail(user.getEmail());
        dto.setStudent(user.isStudent());

        if (user.getSelectedProgram() != null) {
            dto.selectedProgramId = user.getSelectedProgram().getProgramId();
            dto.selectedProgramName = user.getSelectedProgram().getName();
        }

//        if (user.getSelectedProgram() != null) {
//            dto.setSelectedProgram(
//                    ProgramDto.fromEntity(user.getSelectedProgram())
//            );
//        }

        return dto;
    }
}
