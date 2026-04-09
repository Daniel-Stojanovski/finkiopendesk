package com.academic.finkiopendesk.model.dto;

import com.academic.finkiopendesk.model.Tag;
import lombok.Data;

@Data
public class TagDto {
    private String tagId;
    private String name;
    private String program;
    private String format;
    private String hardness;
    private String semesterType;

    public static TagDto fromEntity(Tag tag) {
        TagDto dto = new TagDto();
        dto.setTagId(tag.getTagId());
        dto.setName(tag.getName());
        dto.setProgram(tag.getProgram());
        dto.setFormat(tag.getFormat());
        dto.setHardness(tag.getHardness());
        dto.setSemesterType(tag.getSemesterType());
        return dto;
    }

    public static Tag toEntity(TagDto dto) {
        Tag tag = new Tag();
        tag.setTagId(dto.getTagId());
        tag.setName(dto.getName());
        tag.setProgram(dto.getProgram());
        tag.setFormat(dto.getFormat());
        tag.setHardness(dto.getHardness());
        tag.setSemesterType(dto.getSemesterType());
        return tag;
    }
}
