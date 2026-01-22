package com.academic.finkiopendesk.model;

import com.academic.finkiopendesk.model.enums.CommentType;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "comment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @Column(name = "comment_id")
    @JsonProperty("commentId")
    private String commentId;

    @Enumerated(EnumType.STRING)
    private CommentType type;

    @ManyToOne
    @JoinColumn(name = "subject_discussion_id")
    private SubjectDiscussion subjectDiscussion;

    @ManyToOne
    @JoinColumn(name = "profession_discussion_id")
    private ProfessionDiscussion professionDiscussion;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;
}