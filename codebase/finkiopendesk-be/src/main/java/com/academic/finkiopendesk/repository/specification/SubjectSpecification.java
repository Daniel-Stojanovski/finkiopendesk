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

    public static Specification<Subject> searchAndFilter(
            String query,
            String program,
            String format,
            String hardness,
            String semesterType
    ) {
        return (root, cq, cb) -> {
            cq.distinct(true);

            var predicates = cb.conjunction();

            if (query != null && !query.isBlank()) {
                String like = "%" + query.toLowerCase() + "%";

                var discussionJoin = root.join("discussion");

                predicates = cb.and(predicates,
                        cb.or(
                                cb.like(cb.lower(root.get("name")), like),
                                cb.like(cb.lower(discussionJoin.get("name")), like)
                        )
                );
            }

            if ((program != null && !program.isBlank()) ||
                (format != null && !format.isBlank()) ||
                (hardness != null && !hardness.isBlank()) ||
                (semesterType != null && !semesterType.isBlank())
            ) {

                var subjectTagJoin = root.join("subjectTags");
                var tagJoin = subjectTagJoin.join("tag");

                if (program != null && !program.isBlank()) {
                    predicates = cb.and(predicates,
                            cb.equal(tagJoin.get("program"), program));
                }

                if (format != null && !format.isBlank()) {
                    predicates = cb.and(predicates,
                            cb.equal(tagJoin.get("format"), format));
                }

                if (hardness != null && !hardness.isBlank()) {
                    predicates = cb.and(predicates,
                            cb.equal(tagJoin.get("hardness"), hardness));
                }

                if (semesterType != null && !semesterType.isBlank()) {
                    predicates = cb.and(predicates,
                            cb.equal(tagJoin.get("semesterType"), semesterType));
                }
            }

            return predicates;
        };
    }
}
