package com.academic.finkiopendesk.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "channelId"
)
@Entity
@Table(name = "channel")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Channel {

    @Id
    @Column(name = "channel_id")
    @JsonProperty("channelId")
    private String channelId;

    @JsonProperty("name")
    private String name;

    @Column(columnDefinition = "TEXT")
    @JsonProperty("description")
    private String description;

    @OneToOne
    @JoinColumn(name = "subject_tag_id", unique = true)
    private SubjectTag subjectTag;

    @OneToMany(mappedBy = "channel", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();
}
