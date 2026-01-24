package com.academic.finkiopendesk.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(
        name = "subject_tag",
        uniqueConstraints = @UniqueConstraint(
                columnNames = {"subject_subject_id", "tag_tag_id"}
        )
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubjectTag {

    @Id
    @Column(name = "subject_tag_id")
    @JsonProperty("subjectTagId")
    private String subjectTagId;

    @ManyToOne(optional = false)
    private Subject subject;

    @ManyToOne(optional = false)
    private Tag tag;

    @OneToOne(mappedBy = "subjectTag", cascade = CascadeType.ALL, optional = false)
    private SubjectDiscussion discussion;

    public SubjectDiscussion getDiscussion() {
        return discussion;
    }
}