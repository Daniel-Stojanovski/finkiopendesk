package com.academic.finkiopendesk.model.dto;

import com.academic.finkiopendesk.model.SubjectTag;
import lombok.Data;

@Data
public class SubjectTagDto {
    private String subjectTagId;
    private Boolean statusActive;
    private String tagId;
    private String subjectId;

    public static SubjectTagDto fromEntity(SubjectTag st) {
        SubjectTagDto dto = new SubjectTagDto();
        dto.setSubjectTagId(st.getSubjectTagId());
        dto.setStatusActive(st.isActive());
        dto.setTagId(st.getTag() != null ? st.getTag().getTagId() : null);
        dto.setSubjectId(st.getSubject() != null ? st.getSubject().getSubjectId() : null);
        return dto;
    }
}
