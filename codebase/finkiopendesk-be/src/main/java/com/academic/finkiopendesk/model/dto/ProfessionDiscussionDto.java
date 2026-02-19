package com.academic.finkiopendesk.model.dto;

import com.academic.finkiopendesk.model.ProfessionDiscussion;
import lombok.Data;

import java.util.List;

@Data
public class ProfessionDiscussionDto {
    private String professionDiscussionId;
    private String name;
    private String description;
    private List<CommentDto> comments;

    public static ProfessionDiscussionDto fromEntity(ProfessionDiscussion pd) {
        ProfessionDiscussionDto dto = new ProfessionDiscussionDto();
        dto.setProfessionDiscussionId(pd.getProfessionDiscussionId());
        dto.setName(pd.getName());
        dto.setDescription(pd.getDescription());

        if (pd.getComments() != null) {
            dto.setComments(
                pd.getComments().stream()
                    .map(CommentDto::fromEntity)
                    .toList()
            );
        }

        return dto;
    }
}
