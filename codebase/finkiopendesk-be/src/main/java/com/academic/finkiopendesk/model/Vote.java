package com.academic.finkiopendesk.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;


@Entity
@Table(
        name = "votes",
        uniqueConstraints = @UniqueConstraint(
                columnNames = {"user_id","subject_id","profession_id"}
        )
)
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "vote_id")
    @JsonProperty("voteId")
    private String voteId;

    @Column(name = "user_id")
    @JsonProperty("userId")
    private UUID userId;

    @Column(name = "subject_id")
    @JsonProperty("subjectId")
    private String subjectId;

    @Column(name = "profession_id")
    @JsonProperty("professionId")
    private String professionId;

    private int vote; //can be either 1 or -1
}