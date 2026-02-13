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

public class Tag {

    @Id
    @Column(name = "tag_id")
    @JsonProperty("tagId")
    private String tagId;

    @Column(nullable = false)
    @JsonProperty("name")
    private String name;
}