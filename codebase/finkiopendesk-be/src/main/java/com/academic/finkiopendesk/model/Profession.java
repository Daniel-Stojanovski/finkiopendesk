package com.academic.finkiopendesk.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.ArrayList;

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

    @OneToOne
    @JoinColumn(name = "discussion_id")
    private ProfessionDiscussion discussion;

    public List<Subject> getRecommendedSubjects() {
        return recommendedSubjects;
    }
}
