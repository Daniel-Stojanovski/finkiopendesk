package com.academic.finkiopendesk.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.ArrayList;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "professionDiscussionId"
)
@Entity
@Table(
        name = "profession_discussion",
        uniqueConstraints = @UniqueConstraint(columnNames = "profession_id")
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfessionDiscussion {

    @Id
    @Column(name = "profession_discussion_id")
    @JsonProperty("professionDiscussionId")
    private String professionDiscussionId;

    @Column(nullable = false)
    @JsonProperty("name")
    private String name;

    @Column(columnDefinition = "TEXT")
    @JsonProperty("description")
    private String description;

    @OneToOne(optional = false)
    @JoinColumn(name = "profession_id", unique = true)
    private Profession profession;

    @OneToMany(mappedBy = "professionDiscussion", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();
}
