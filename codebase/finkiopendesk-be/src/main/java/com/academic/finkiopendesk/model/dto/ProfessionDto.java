package com.academic.finkiopendesk.model.dto;

import com.academic.finkiopendesk.model.Profession;
import lombok.Data;

import java.util.List;

@Data
public class ProfessionDto {
    private String professionId;
    private String name;
    private String alternativeName;
    private String description;
    private ProfessionDiscussionDto discussion;
    private List<SubjectDto> recommendedSubjects;

    public static ProfessionDto fromEntity(Profession profession) {
        ProfessionDto dto = new ProfessionDto();
        dto.setProfessionId(profession.getProfessionId());
        dto.setName(profession.getName());
        dto.setAlternativeName(profession.getAlternativeName());
        dto.setDescription(profession.getDescription());

        if (profession.getDiscussion() != null) {
            dto.setDiscussion(ProfessionDiscussionDto.fromEntity(profession.getDiscussion()));
        }

        dto.setRecommendedSubjects(
            profession.getRecommendedSubjects().stream()
                .map(SubjectDto::fromEntity)
                .toList()
        );

        return dto;
    }
}