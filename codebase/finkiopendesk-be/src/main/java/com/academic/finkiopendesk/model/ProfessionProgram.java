package com.academic.finkiopendesk.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
        name = "profession_program",
        uniqueConstraints = @UniqueConstraint(
                columnNames = {"profession_profession_id", "program_program_id"}
        )
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ProfessionProgram {

    @Id
    @Column(name = "profession_program_id")
    @JsonProperty("professionProgramId")
    private String professionProgramId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "profession_id")
    private Profession profession;

    @ManyToOne(optional = false)
    @JoinColumn(name = "program_id")
    private Program program;

    @Column(name = "applicable", nullable = false)
    private Boolean applicable;

    public Boolean isApplicable() { return applicable; }
}