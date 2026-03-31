package com.academic.finkiopendesk.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(
        name = "user_favorites",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "target_id", "target_type"})
        })
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserFavorite {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_favorite_id")
    @JsonProperty("userFavoriteId")
    private String userFavoriteId;

    @Column(name = "user_id", nullable = false)
    @JsonProperty("userId")
    private UUID userId;

    @Column(name = "target_id", nullable = false)
    @JsonProperty("targetId")
    private String targetId;

    @Column(name = "target_type", nullable = false)
    @JsonProperty("targetType")
    private String targetType;
}
