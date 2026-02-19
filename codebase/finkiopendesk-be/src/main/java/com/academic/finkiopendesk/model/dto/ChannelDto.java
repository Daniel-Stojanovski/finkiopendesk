package com.academic.finkiopendesk.model.dto;

import com.academic.finkiopendesk.model.Channel;
import lombok.Data;

import java.util.List;

@Data
public class ChannelDto {
    private String channelId;
    private String name;
    private String description;
    private SubjectTagDto subjectTag;
    private List<CommentDto> comments;

    public static ChannelDto fromEntity(Channel c) {
        ChannelDto dto = new ChannelDto();
        dto.setChannelId(c.getChannelId());
        dto.setName(c.getName());
        dto.setDescription(c.getDescription());
        dto.setComments(
                c.getComments() != null ? c.getComments().stream().map(CommentDto::fromEntity).toList() : null
        );
        if (c.getSubjectTag() != null) {
            dto.setSubjectTag(SubjectTagDto.fromEntity(c.getSubjectTag()));
        }
        return dto;
    }
}

