package com.academic.finkiopendesk.repository.specification;

import com.academic.finkiopendesk.model.ProgramSubject;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public class ProgramSubjectSpecification {

    public static Specification<ProgramSubject> search(String query) {
        return (root, cq, cb) -> {
            if (query == null || query.isBlank()) {
                return cb.conjunction();
            }

            String like = "%" + query.toLowerCase() + "%";

            var subjectJoin = root.join("subject");
            var discussionJoin = subjectJoin.join("discussion");

            return cb.or(
                    cb.like(cb.lower(subjectJoin.get("name")), like),
                    cb.like(cb.lower(discussionJoin.get("name")), like)
            );
        };
    }

    public static Specification<ProgramSubject> searchAndFilter(
            List<String> programIds,
            String query,
            String program,
            String format,
            String hardness,
            String semesterType
    ) {
        return (root, cq, cb) -> {

            cq.distinct(true);

            var predicates = cb.conjunction();

            var subject = root.join("subject");
            var discussion = subject.join("discussion");
            var subjectTags = subject.join("subjectTags");
            var tag = subjectTags.join("tag");

            if (programIds != null && !programIds.isEmpty()) {
                predicates = cb.and(predicates,
                        root.get("program").get("programId").in(programIds));
            }

            if (query != null && !query.isBlank()) {
                String like = "%" + query.toLowerCase() + "%";

                predicates = cb.and(predicates,
                        cb.or(
                                cb.like(cb.lower(subject.get("name")), like),
                                cb.like(cb.lower(discussion.get("name")), like)
                        )
                );
            }

//            if (program != null && !program.isBlank()) {
//                predicates = cb.and(predicates,
//                        cb.equal(tag.get("program"), program));
//            }
//
//            if (format != null && !format.isBlank()) {
//                predicates = cb.and(predicates,
//                        cb.equal(tag.get("format"), format));
//            }
//
//            if (hardness != null && !hardness.isBlank()) {
//                predicates = cb.and(predicates,
//                        cb.equal(tag.get("hardness"), hardness));
//            }
//
//            if (semesterType != null && !semesterType.isBlank()) {
//                predicates = cb.and(predicates,
//                        cb.equal(tag.get("semesterType"), semesterType));
//            }
//
//            return predicates;
//        };
            if ((program != null && !program.isBlank()) ||
                    (format != null && !format.isBlank()) ||
                    (hardness != null && !hardness.isBlank()) ||
                    (semesterType != null && !semesterType.isBlank())
            ) {

                var subquery = cq.subquery(Long.class);
                var subRoot = subquery.from(ProgramSubject.class);

                var subSubject = subRoot.join("subject");
                var subTags = subSubject.join("subjectTags");
                var subTag = subTags.join("tag");

                subquery.select(cb.literal(1L));

                subquery.where(
                        cb.equal(subRoot.get("id"), root.get("id")),
                        cb.and(
                                program != null && !program.isBlank()
                                        ? cb.equal(subTag.get("program"), program)
                                        : cb.conjunction(),

                                format != null && !format.isBlank()
                                        ? cb.equal(subTag.get("format"), format)
                                        : cb.conjunction(),

                                hardness != null && !hardness.isBlank()
                                        ? cb.equal(subTag.get("hardness"), hardness)
                                        : cb.conjunction(),

                                semesterType != null && !semesterType.isBlank()
                                        ? cb.equal(subTag.get("semesterType"), semesterType)
                                        : cb.conjunction()
                        )
                );

                predicates = cb.and(predicates, cb.exists(subquery));
            }

            return predicates;
        };
    }
}