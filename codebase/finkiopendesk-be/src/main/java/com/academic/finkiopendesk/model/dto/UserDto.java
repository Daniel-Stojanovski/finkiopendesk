package com.academic.finkiopendesk.model.dto;

import com.academic.finkiopendesk.model.User;
import lombok.Data;

import java.util.UUID;

@Data
public class UserDto {
    UUID userId;
    String email;

    public static UserDto fromEntity(User user) {
        UserDto dto = new UserDto();
        dto.setUserId(user.getUserId());
        dto.setEmail(user.getEmail());
        return dto;
    }
}
