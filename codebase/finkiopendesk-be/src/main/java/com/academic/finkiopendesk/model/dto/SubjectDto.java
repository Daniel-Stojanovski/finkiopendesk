package com.academic.finkiopendesk.model.dto;

import com.academic.finkiopendesk.model.Subject;
import lombok.Data;

import java.util.List;

@Data
public class SubjectDto {
    private String subjectId;
    private String name;
    private String description;
    private SubjectDiscussionDto discussion;
    private List<SubjectTagDto> tags;

    public static SubjectDto fromEntity(Subject s) {
        SubjectDto dto = new SubjectDto();
        dto.setSubjectId(s.getSubjectId());
        dto.setName(s.getName());
        dto.setDescription(s.getDescription());

        if (s.getDiscussion() != null) {
            dto.setDiscussion(SubjectDiscussionDto.fromEntity(s.getDiscussion()));
        }

        if (s.getSubjectTags() != null) {
            dto.setTags(
                s.getSubjectTags().stream()
                    .map(SubjectTagDto::fromEntity)
                    .toList()
            );
        }

        return dto;
    }
}