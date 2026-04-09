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
//
//    public static Specification<Subject> filterByTag(
//            String program,
//            String format,
//            String hardness,
//            String semesterType
//    ) {
//        return (root, cq, cb) -> {
//            cq.distinct(true);
//
//            var subjectTagJoin = root.join("subjectTags");
//            var tagJoin = subjectTagJoin.join("tag");
//
//            var predicates = cb.conjunction();
//
//            if (program != null) {
//                predicates = cb.and(predicates,
//                        cb.equal(tagJoin.get("program"), program));
//            }
//
//            if (format != null) {
//                predicates = cb.and(predicates,
//                        cb.equal(tagJoin.get("format"), format));
//            }
//
//            if (hardness != null) {
//                predicates = cb.and(predicates,
//                        cb.equal(tagJoin.get("hardness"), hardness));
//            }
//
//            if (semesterType != null) {
//                predicates = cb.and(predicates,
//                        cb.equal(tagJoin.get("semesterType"), semesterType));
//            }
//
//            return predicates;
//        };
//    }
//    public static Specification<Subject> searchAndFilter(
//        String query,
//        String program,
//        String format,
//        String hardness,
//        String semesterType
//    ) {
//        return (root, cq, cb) -> {
//            cq.distinct(true);
//
//            var predicates = cb.conjunction();
//
//            if (query != null && !query.isBlank()) {
//                String like = "%" + query.toLowerCase() + "%";
//
//                var discussionJoin = root.join("discussion");
//
//                predicates = cb.and(predicates,
//                        cb.or(
//                                cb.like(cb.lower(root.get("name")), like),
//                                cb.like(cb.lower(discussionJoin.get("name")), like)
//                        )
//                );
//            }
//
//            if (program != null || format != null || hardness != null || semesterType != null) {
//                var subjectTagJoin = root.join("subjectTags", JoinType.INNER);
//                var tagJoin = subjectTagJoin.join("tag", JoinType.INNER);
//
//                var tagPredicates = cb.conjunction();
//
//                if (program != null) tagPredicates = cb.and(tagPredicates, cb.equal(tagJoin.get("program"), program));
//                if (format != null) tagPredicates = cb.and(tagPredicates, cb.equal(tagJoin.get("format"), format));
//                if (hardness != null) tagPredicates = cb.and(tagPredicates, cb.equal(tagJoin.get("hardness"), hardness));
//                if (semesterType != null) tagPredicates = cb.and(tagPredicates, cb.equal(tagJoin.get("semesterType"), semesterType));
//
//                // Apply the tagPredicates per subjectTag
//                predicates = cb.and(predicates, tagPredicates);
//            }
////            if (program != null || format != null || hardness != null || semesterType != null) {
////
////                var subjectTagJoin = root.join("subjectTags");
////                var tagJoin = subjectTagJoin.join("tag");
////
////                if (program != null) {
////                    predicates = cb.and(predicates,
////                            cb.equal(tagJoin.get("program"), program));
////                }
////
////                if (format != null) {
////                    predicates = cb.and(predicates,
////                            cb.equal(tagJoin.get("format"), format));
////                }
////
////                if (hardness != null) {
////                    predicates = cb.and(predicates,
////                            cb.equal(tagJoin.get("hardness"), hardness));
////                }
////
////                if (semesterType != null) {
////                    predicates = cb.and(predicates,
////                            cb.equal(tagJoin.get("semesterType"), semesterType));
////                }
////            }
//
//            return predicates;
//        };
//    }
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

            // 🔍 SEARCH
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

            // 🎯 FILTERS
            if (
                    (program != null && !program.isBlank()) ||
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
