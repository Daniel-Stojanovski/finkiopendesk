package com.academic.finkiopendesk.model;

import com.academic.finkiopendesk.model.enums.ProgramSubjectType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "program_subject")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProgramSubject {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "program_subject_id")
    @JsonProperty("programSubjectId")
    private String programSubjectId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id", nullable = false)
    private Program program;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private ProgramSubjectType type; // "MANDATORY", "ELECTIVE", "OTHER"

    @ManyToMany
    @JoinTable(
            name = "subject_dependency",
            joinColumns = @JoinColumn(name = "program_subject_id"),
            inverseJoinColumns = @JoinColumn(name = "dependant_id")
    )
    private Set<ProgramSubject> dependencies = new HashSet<>();
}