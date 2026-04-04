package com.academic.finkiopendesk.model;

import com.academic.finkiopendesk.model.enums.CommentType;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_user_id", nullable = false)
    private User user;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_parent_id")
    private Comment parentComment;

    @OneToMany(mappedBy = "parentComment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> replies = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;
}