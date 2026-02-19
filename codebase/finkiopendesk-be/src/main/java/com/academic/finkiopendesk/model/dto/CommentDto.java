package com.academic.finkiopendesk.model.dto;

import com.academic.finkiopendesk.model.Comment;
import lombok.Data;
import com.academic.finkiopendesk.model.enums.CommentType;

@Data
public class CommentDto {
    private String commentId;
    private CommentType type;
    private String content;
    private String subjectDiscussionId;
    private String professionDiscussionId;
    private String channelId;

    public static CommentDto fromEntity(Comment comment) {
        CommentDto dto = new CommentDto();
        dto.setCommentId(comment.getCommentId());
        dto.setType(comment.getType());
        dto.setContent(comment.getContent());
        dto.setChannelId(comment.getChannel() != null ? comment.getChannel().getChannelId() : null);
        dto.setSubjectDiscussionId(comment.getSubjectDiscussion() != null ? comment.getSubjectDiscussion().getSubjectDiscussionId() : null);
        dto.setProfessionDiscussionId(comment.getProfessionDiscussion() != null ? comment.getProfessionDiscussion().getProfessionDiscussionId() : null);
        return dto;
    }

    public static Comment toEntity(CommentDto dto) {
        Comment c = new Comment();
        c.setCommentId(dto.getCommentId());
        c.setContent(dto.getContent());
        c.setType(dto.getType());
        return c;
    }
}
