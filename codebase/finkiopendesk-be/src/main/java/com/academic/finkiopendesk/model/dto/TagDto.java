package com.academic.finkiopendesk.model.dto;

import com.academic.finkiopendesk.model.Tag;
import lombok.Data;

@Data
public class TagDto {
    private String tagId;
    private String name;
    public static TagDto fromEntity(Tag tag) {
        TagDto dto = new TagDto();
        dto.setTagId(tag.getTagId());
        dto.setName(tag.getName());
        return dto;
    }

    public static Tag toEntity(TagDto dto) {
        Tag tag = new Tag();
        tag.setTagId(dto.getTagId());
        tag.setName(dto.getName());
        return tag;
    }
}
