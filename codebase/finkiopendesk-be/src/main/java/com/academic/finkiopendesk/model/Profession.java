package com.academic.finkiopendesk.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.ArrayList;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "professionId"
)
@Entity
@Table(name = "profession")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Profession {

    @Id
    @Column(name = "profession_id")
    @JsonProperty("professionId")
    private String professionId;

    @Column(nullable = false)
    @JsonProperty("name")
    private String name;

    @Column(name = "alternative_name")
    @JsonProperty("alternativeName")
    private String alternativeName;

    @Column(columnDefinition = "TEXT")
    @JsonProperty("description")
    private String description;

    @OneToMany
    @JoinTable(
            name = "profession_subject_recommendation",
            joinColumns = @JoinColumn(name = "profession_profession_id"),
            inverseJoinColumns = @JoinColumn(name = "subject_subject_id")
    )
    private List<Subject> recommendedSubjects = new ArrayList<>();

    @OneToOne(mappedBy = "profession")
    private ProfessionDiscussion discussion;
}
