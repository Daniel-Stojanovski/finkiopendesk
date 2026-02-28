package com.academic.finkiopendesk.model;

import com.academic.finkiopendesk.model.enums.CommentType;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "commentId"
)
@Entity
@Table(name = "comment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
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

    @ManyToOne
    @JoinColumn(name = "channel_id")
    private Channel channel;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;
}