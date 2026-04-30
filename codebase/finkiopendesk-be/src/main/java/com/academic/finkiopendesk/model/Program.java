package com.academic.finkiopendesk.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "program")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Program {

    @Id
    @Column(name = "program_id")
    @JsonProperty("programId")
    private String programId;

    @Column(nullable = false)
    @JsonProperty("name")
    private String name;

    @Column(name = "full_name")
    @JsonProperty("fullName")
    private String fullName;

    @Column(name = "alias_full_name_en")
    @JsonProperty("aliasFullNameEn")
    private String aliasFullNameEn;

    @Column(columnDefinition = "TEXT")
    @JsonProperty("description")
    private String description;
}
