package com.academic.finkiopendesk.repository;

import com.academic.finkiopendesk.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaSpecificationRepository<User, UUID> {
    Optional<User> findByEmail(String email);

    @Query("SELECT user FROM User user WHERE user.student = TRUE")
    List<User> findAllStudents();

    @Query("""
            SELECT user FROM User user
            WHERE user.student = TRUE
                AND user.enabled = FALSE
    """)
    List<User> findAllPendingStudents();

    @Query("SELECT user FROM User user WHERE user.student = FALSE")
    List<User> findAllGuests();

}
