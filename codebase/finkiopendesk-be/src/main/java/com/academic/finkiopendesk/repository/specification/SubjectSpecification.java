package com.academic.finkiopendesk.repository.specification;

import com.academic.finkiopendesk.model.Subject;
import org.springframework.data.jpa.domain.Specification;

public class SubjectSpecification {
    public static Specification<Subject> search(String query) {
        return (root, cq, cb) -> {
            if (query == null || query.isBlank()) {
                return cb.conjunction();
            }

            String like = "%" + query.toLowerCase() + "%";

            return cb.or(
                    cb.like(cb.lower(root.get("name")), like),

                    cb.like(
                            cb.lower(root.join("discussion").get("name")),
                            like
                    )
            );
        };
    }
}
