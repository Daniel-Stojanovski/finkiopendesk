package com.academic.finkiopendesk.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.ArrayList;

@Entity
@Table(
        name = "subject_discussion",
        uniqueConstraints = @UniqueConstraint(columnNames = "subject_tag_id")
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubjectDiscussion {

    @Id
    @Column(name = "subject_discussion_id")
    @JsonProperty("subjectDiscussionId")
    private String subjectDiscussionId;

    @Column(nullable = false)
    @JsonProperty("name")
    private String name;

    @Column(columnDefinition = "TEXT")
    @JsonProperty("description")
    private String description;

    @OneToOne(optional = false)
    @JoinColumn(name = "subject_id", unique = true)
    private Subject subject;

    @OneToMany(mappedBy = "subjectDiscussion", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();
}
