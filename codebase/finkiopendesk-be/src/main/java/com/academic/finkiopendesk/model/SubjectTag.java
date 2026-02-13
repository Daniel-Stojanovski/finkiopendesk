package com.academic.finkiopendesk.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "subjectTagId"
)
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

    @OneToOne(mappedBy = "subjectTag", cascade = CascadeType.ALL)
    private Channel channel;

    @Column(name = "status_active", nullable = false)
    @JsonProperty("status")
    private Boolean status;

    public Boolean isActive() { return status; }
}