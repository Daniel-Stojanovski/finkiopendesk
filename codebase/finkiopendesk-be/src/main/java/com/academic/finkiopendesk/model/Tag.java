package com.academic.finkiopendesk.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "tagId"
)
@Entity
@Table(name = "tag", uniqueConstraints = @UniqueConstraint(columnNames = "name"))
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Tag {

    @Id
    @Column(name = "tag_id")
    @JsonProperty("tagId")
    private String tagId;

    @Column(nullable = false)
    @JsonProperty("name")
    private String name;

    @Column(nullable = false)
    @JsonProperty("program")
    private String program;

    @Column(nullable = false)
    @JsonProperty("format")
    private String format;

    @Column(nullable = false)
    @JsonProperty("hardness")
    private String hardness;

    @Column(nullable = false)
    @JsonProperty("semesterType")
    private String semesterType;
}