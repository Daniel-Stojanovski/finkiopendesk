package com.academic.finkiopendesk.repository;



import com.academic.finkiopendesk.model.UserFavorite;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserFavoriteRepository extends JpaSpecificationRepository<UserFavorite, String> {

    List<UserFavorite> findByUserId(UUID userId);

    @Query("""
        SELECT uf
        FROM UserFavorite uf
        WHERE uf.userId = :userId
        AND uf.targetId = :targetId
        AND uf.targetType = :targetType
    """)
    Optional<UserFavorite> findExact(
            UUID userId,
            String targetId,
            String targetType
    );
}