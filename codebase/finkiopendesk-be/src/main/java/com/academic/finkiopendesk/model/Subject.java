package com.academic.finkiopendesk.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "subjectId"
)
@Entity
@Table(name = "subject")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Subject {

    @Id
    @Column(name = "subject_id")
    @JsonProperty("subjectId")
    private String subjectId;

    @Column(nullable = false)
    @JsonProperty("name")
    private String name;

    @Column(columnDefinition = "TEXT")
    @JsonProperty("description")
    private String description;

    @OneToOne(mappedBy = "subject")
    private SubjectDiscussion discussion;

    @OneToMany(mappedBy = "subject")
    private Set<SubjectTag> subjectTags = new HashSet<>();
}