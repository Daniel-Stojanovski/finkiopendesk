package com.academic.finkiopendesk.model.dto;

import com.academic.finkiopendesk.model.SubjectDiscussion;
import lombok.Data;

import java.util.List;

@Data
public class SubjectDiscussionDto {
    private String subjectDiscussionId;
    private String name;
    private String description;
    private List<CommentDto> comments;

    public static SubjectDiscussionDto fromEntity(SubjectDiscussion sd) {
        SubjectDiscussionDto dto = new SubjectDiscussionDto();
        dto.setSubjectDiscussionId(sd.getSubjectDiscussionId());
        dto.setName(sd.getName());
        dto.setDescription(sd.getDescription());

        if (sd.getComments() != null) {
            dto.setComments(
                sd.getComments().stream()
                    .map(CommentDto::fromEntity)
                    .toList()
            );
        }

        return dto;
    }
}
